import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import 'sf-font';
import axios from 'axios';
import VAULTABI from '../config/VAULTABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, moralisapi, nftpng } from '../../../common/config/ethconfig.js';
import { ETHNFTCONTRACT, ETHSTAKINGCONTRACT, moralisapi, ethnftpng } from '../../../common/config/ethconfig.js';
import { BSCNFTCONTRACT, BSCSTAKINGCONTRACT, moralisapi, bscnftpng } from '../../../common/config/bscconfig.js';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';
import * as React from "react";
import Image from '../check.gif';

var account = null;
var vaultcontract = null;
var web3 = null;

const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const providerOptions = {
    binancechainwallet: {
        package: true
    },
    Walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa'
        }
    },
    Walletlink: {
        package: WalletLink,
        options: {
            appName: 'f-nft Polygon',
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa',
            rpc: "",
            chainId: 137,
            appLogoUrl: null,
            darkMode: true
        }
    },
};

const web3Modal = new Web3Modal({
    network: 'mainnet',
    theme: 'dark',
    cacheProvider: true,
    providerOptions
});

export default function ListNft() {
    const [apicall, getNfts] = useState([])
    const [nftstk, getStk] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        callApi()
    }, [])

    async function callApi() {
        try {
            var provider = await web3Modal.connect();
            web3 = new Web3(provider);
            await provider.send('eth_requestAccounts');
            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
            let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
            const nfts = await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers: config })
                .then(output => {
                    const { result } = output.data
                    return result;
                })
            const apicall = await Promise.all(nfts.map(async i => {
                let item = {
                    tokenId: i.token_id,
                    holder: i.owner_of,
                    wallet: account,
                }
                return item
            }))
            const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
                .then(id => {
                    return id;
                })
            const nftstk = await Promise.all(stakednfts.map(async i => {
                let stkid = {
                    tokenId: i,
                }
                return stkid
            }))
            getNfts(apicall)
            getStk(nftstk)
            console.log(apicall);
            setLoadingState('loaded');
            console.log("[INFO] Success")
        } catch (error) {
            console.log("[ERROR]:", error)
        }

        try {
            vaultcontract = new web3.eth.Contract(VAULTABI, BSCSTAKINGCONTRACT);
            let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
            const bscnfts = await axios.get((moralisapi + `/nft/${BSCNFTCONTRACT}/owners?chain=bsc&format=decimal`), { headers: config })
                .then(output => {
                    const { result } = output.data
                    return result;
                })
            const apicall = await Promise.all(bscnfts.map(async i => {
                let item = {
                    tokenId: i.token_id,
                    holder: i.owner_of,
                    wallet: account,
                }
                return item
            }))
            const bscstakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
                .then(id => {
                    return id;
                })
            const bscnftstk = await Promise.all(bscstakednfts.map(async i => {
                let stkid = {
                    tokenId: i,
                }
                return stkid
            }))
            getNfts(apicall)
            getStk(nftstk)
            console.log(apicall);
            setLoadingState('loaded');
            console.log("[INFO] Success")
        } catch (error) {
            console.log("[ERROR]:", error)
        }

    }

    if (loadingState === 'loaded' && !apicall.length)
        return (
            <h1 className="text-3xl">Wallet Not Connected</h1>)

            async function getNFTData() {
                const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
                  address,
                  chain,
                })
                const native = nativeBalance.result.balance.ether
              
                const tokenBalances = await Moralis.EvmApi.account.getTokenBalances({
                  address,
                  chain,
                })
                const tokens = tokenBalances.result.map((token) => token.display())
                
                // Get the nfts
                const nftsBalances = await Moralis.EvmApi.account.getNFTs({
                  address,
                  chain,
                  limit: 10,
                })
              
                // Format the output to return name, amount and metadata
                const nfts = nftsBalances.result.map((nft) => ({
                  name: nft.result.name,
                  amount: nft.result.amount,
                  metadata: nft.result.metadata,
                }))
                
                // Add nfts to the output
                return { native, tokens, nfts }
            }
            
    return (
        <div className='flex flex-1 justify-center'>
            <div className="container col-lg-12">
                <div className="row items px-3 pt-3">
                    <div className="px-3 container" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "18px" }}>
                        {apicall.map((nft, i) => {
                            var owner = nft.wallet.toLowerCase();
                            if (owner.indexOf(nft.holder) !== -1) {
                                async function stakeit() {
                                    vaultcontract.methods.stake([nft.tokenId]).send({ from: account });
                                }
                                return (
                                    <div className="snap-center static card nft-card mt-3 mb-3" style={{ scrollPaddingInline: "auto", textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i}>
                                        <div className="image-over">
                                            <img className="card-img-top" src={nftpng + nft.tokenId} alt="{Fantasy NFT + nft.tokenId}" />
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                                <h6 className="py-2">Status<p style={{ color: "#f5284E", textShadow: "1px 1px 2px #000000" }}>Ready to Stake</p></h6>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                    <Button className="items-center" style={{ marginLeft: '15px', backgroundColor: "red", textShadow: "1px 1px 3px #ffffff", padding: '5px', fontSize: '12px', border: '5px', borderRadius: '8px', boxShadow: '1px 1px 5px #ffffff', marginBottom: '5px' }} onClick={stakeit}>STAKE</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return null;
                            }
                        })}
                        {nftstk.map((nft, i) => {
                            async function unstakeit() {
                                vaultcontract.methods.unstake([nft.tokenId]).send({
                                    from: account,
                                    gas: "30000",
                                    gasPriceinWei: "1000",
                                });
                            }
                            return (
                                <div className="snap-center card stakedcard mt-3 mb-3" style={{ textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i} >
                                    <div className="image-over">
                                        <img style={{ position: 'absolute', top: '0.05rem', width: '79px' }} src={Image} alt='Checked'></img>
                                        <img className="card-img-top" src={nftpng + nft.tokenId} alt="Fantasy NFT" />
                                    </div>
                                    <div className="card-caption col-12 p-0">
                                        <div className="card-body">
                                            <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                            <h6 className="py-2">Status<p style={{ color: "#B10089", textShadow: "1px 1px 2px #000000" }}>Currently Staked</p></h6>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                <Button style={{ marginLeft: '15px', backgroundColor: "purple", textShadow: "1px 1px 3px #ffffff", padding: '5px', fontSize: '12px', border: '5px', borderRadius: '8px', boxShadow: '1px 1px 5px #ffffff', marginBottom: '5px' }} onClick={unstakeit}>UNSTAKE</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}