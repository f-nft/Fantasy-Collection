import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
import formatic from "../../../assets/images/icon/Formatic.svg";
import trustWalletIcon from "../../../assets/images/icon/Trust_Wallet.svg";
import walletConnect from "../../../assets/images/icon/WalletConnect.svg";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import {NFTCONTRACT} from '../../config/config';
import { ETHNFTCONTRACT } from '../../config/ethconfig';
import { BSCNFTCONTRACT } from '../../config/bscconfig';

const providerOptions = {
};

const { ethereum } = window;
const WalletModal = () => {
  const { walletModalHandle } = useModal();

  async function connectWallet() {

    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        // use bsc as the provider name
        providerOptions: providerOptions

      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      var accounts = await web3ModalProvider.listAccounts();
      console.log(accounts);
      //get balance
      const balance = await web3ModalProvider.getBalance(accounts[0]);
      //convert balance to ether
      const etherBalance = ethers.utils.formatEther(balance);
      console.log(etherBalance);
      //close current modal
      walletModalHandle();
      //if wallet is connected then set the wallet address in local storage
      localStorage.setItem("walletAddress", accounts[0]);
      //set balance in local storage
      localStorage.setItem("balance", etherBalance);

      try {
        //gry network chain ID to which user is connected


        const chainId = await web3ModalProvider.getNetwork().then(function (network) {
          console.log(network.chainId)
          //get typeof chainID
          console.log("typeof chainID", typeof network.chainId)

          localStorage.setItem("chainId", network.chainId);
        }
        ).catch(function (error) {
          console.log(error)
        }
        
        
        );
      } catch (error) {
        console.log(error);
      }
         //get network chain id
  
      //get account
      try {
        accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
        var account = accounts[0];
        console.log("Account selected " + account);
      } catch (err) {
        alert(err.message);
        return null;
      }

    } catch (error) {

    }
 

  }

  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div
          className="mint_modal_box"
        >
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>CONNECT WALLET</h2>
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please select a wallet to connect for start Minting your NFTs
              </p>
              <div className="wallet_list">
                <a href="# " onClick={connectWallet}>
                  <img src={metamaskIcon} alt="Metmask" />
                  Metamask
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={formatic} alt="coinbase" />
                  Coinbase
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={trustWalletIcon} alt="Trust" />
                  Trust Wallet
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={walletConnect} alt="Wallet" />
                  WalletConnect
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
              </div>
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <a href="# ">Terms of Service</a>
                <a href="# ">Privacy Policy</a>
              </div>
            </div>

            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </WalletModalStyleWrapper>
    </>
  );
};
export async function mint(numberofNFTs,e) {
  e.preventDefault();
  //mint for metamask polygon network
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    if (!window.ethereum.selectedAddress) {
      alert("Please unlock your MetaMask account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    let balance = await provider.getBalance(accounts[0]);
    if (balance.lt(ethers.utils.parseEther("0.001"))) {
      alert("Please deposit at least 0.01 ETH / 120 Matic / 0.025 BNB to the MetaMask account");
      return;
    }
    let bal = ethers.utils.formatEther(balance);
    console.log(bal);
    var ContractID=null;
    //get chainID from local storage
    const chainId = localStorage.getItem("chainId");
    if(chainId==137){
      //mint for polygon network
      ContractID=NFTCONTRACT;

    }
    else if(chainId==56){
      //mint for BSC network
      ContractID=BSCNFTCONTRACT;
    }
    else if(chainId==1){
      
      //mit for ETH network
      ContractID=ETHNFTCONTRACT;
    }
    else{
      alert("Please connect to a supported network");
      return;
    }
   

    var gasfromcontract=await provider.getGasPrice();
    //convert gas to ether
    var gasEther=ethers.utils.formatEther(gasfromcontract);
    console.log("Gas is "+gasEther);
    //convert gasEther to wei
    var gasWei=ethers.utils.parseEther(gasEther);
    console.log("New gas WEI is "+gasWei);

 
    ethereum.request({
      method: "eth_sendTransaction", params: [{
        from: accounts[0],
        to: ContractID,
        value: ethers.utils.parseEther("0.001").toString(),
        gas: "21000",
        gasPrice: (numberofNFTs*gasfromcontract).toString(),
      }]
    
    }).then(function (response) {
      console.log(response);
    }
    ).catch(function (error) {
      console.log(error);
    }
    );


  }
  catch (error) {
    alert(error);
  }
}

export default WalletModal;