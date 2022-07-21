import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
// import formatic from "../../../assets/images/icon/Formatic.svg";
// import trustWalletIcon from "../../../assets/images/icon/Trust_Wallet.svg";
// import walletConnect from "../../../assets/images/icon/WalletConnect.svg";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { NFTCONTRACT } from '../../config/config';
import { ETHNFTCONTRACT } from '../../config/ethconfig';
import { BSCNFTCONTRACT } from '../../config/bscconfig';
// import { STAKINGCONTRACT } from "../../config/config";
import ABI from '../../config/ABI.json';
// import VAULTABI from '../../config/VAULTABI.json';

// var abi = ABI

const { ethereum } = window;
const WalletModal = () => {
  const { walletModalHandle } = useModal();

  async function connectWallet() {

    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,

      });

      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      // const signer = web3ModalProvider.getSigner();
      var accounts = await web3ModalProvider.listAccounts();

      // const nftContract = new Contract(NFTCONTRACT, ABI, signer);
      // const bscContract=new Contract(BSCNFTCONTRACT,ABI,signer);

      // const StakeContract = new Contract(STAKINGCONTRACT, VAULTABI, signer);
      // const totalstaked = await StakeContract.totalStaked();
      // const totalstakedwei = totalstaked.toString();
      // console.log(totalstakedwei);

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
        //agree network chain ID to which user is connected
        // eslint-disable-next-line
        const chainId = await web3ModalProvider.getNetwork().then(function (network) {
          console.log(network.chainId)
          //get typeof chainID
          console.log("type of chainID", typeof network.chainId)

          localStorage.setItem("chainId", network.chainId);
        }
        ).catch(function (error) {
          console.log(error)
          window.location.reload();
        }
        );
      } catch (error) {
        console.log(error);
      }
      // get network chain id
      // get account
      try {
        accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
        var account = accounts[0];
        console.log("Account selected" + account);
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
                <a href="# " onClick={connectWallet} >
                  <img src={metamaskIcon} alt="Metmask" />
                  Metamask
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                {/* <a href="# ">
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
                </a> */}
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

export async function mint(numberofNFTs, e) {
  const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
  const responseMatic = await fetch(maticPrice);
  const dataMatic = await responseMatic.json()
  console.log("Matic Price " + dataMatic.price); //data.price is the price of MATIC in USDT
  e.preventDefault();
  var maticRate = 1 / dataMatic.price;

  const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
  const responseBnb = await fetch(bnbPrice);
  const dataBnb = await responseBnb.json()
  console.log("BNB Price " + dataBnb.price); //data.price is the price of BNB in USDT
  e.preventDefault();
  var bnbRate = 1 / dataBnb.price;

  const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
  const responseEth = await fetch(ethPrice);
  const dataEth = await responseEth.json()
  console.log("ETH Price " + dataEth.price); //data.price is the price of ETH in USDT
  var ethRate = 1 / (dataEth.price / 10); //reduce gas price

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    if (!window.ethereum.selectedAddress) {
      alert("Please unlock your MetaMask account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    let balance = await provider.getBalance(accounts[0]);
    if (balance.lt(ethers.utils.parseEther("0.03"))) {
      alert("Please deposit at least $60 ~ 0.05 ETH / 80 Matic / 0.25 BNB to the MetaMask account");
      return;
    }

    let bal = ethers.utils.formatEther(balance);
    console.log(bal);
    var ContractID = null;

    // get chainID from local storage
    const chainId = localStorage.getItem("chainId");

    // eslint-disable-next-line
    if (chainId == 137) {
      //mint for polygon network
      ContractID = NFTCONTRACT;

      // get NFT contract ABI
      // const contract = require("../../config/contract.json");
      // const nftContract = await provider.Contract(contract.abi, ContractID);
      // console.log(nftContract);
      // const tokenURI = nftContract.getTokenURI();

      var nftPrice = 60 * maticRate;
      console.log("NFT Price in Matic " + nftPrice);
      localStorage.setItem("nftPriceMatic", nftPrice);
      var gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      var gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      var gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      var Gas = gasWei * 1;

    }
    // eslint-disable-next-line
    else if (chainId == 56) {
      //mint for BSC network
      ContractID = BSCNFTCONTRACT;

      // get NFT contract ABI
      // const contract = require("../../config/contract.json");
      // const nftContract = await provider.Contract(contract.abi, ContractID);
      // const tokenURI = nftContract.getTokenURI();

      var nftPrice = 60 * bnbRate;
      localStorage.setItem("nftPriceBNB", nftPrice);
      var gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      var gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      var gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      var Gas = gasWei * 1;

    }
    // eslint-disable-next-line
    else if (chainId == 1) {
      //mit for ETH network
      ContractID = ETHNFTCONTRACT;

      // get NFT contract ABI
      // const contract = require("../../config/contract.json");
      // const nftContract = await provider.Contract(contract.abi, ContractID);
      // const tokenURI = nftContract.getTokenURI();

      var nftPrice = 60 * ethRate;
      localStorage.setItem("nftPriceETH", nftPrice);
      var gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      var gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      var gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      var Gas = gasWei * 0.001;
    }

    else {
      alert("Please connect to Metamask");
      window.location.reload();
      return;
    }

    // var gasfromcontract = await provider.getGasPrice(16);
    // //convert gas to ether
    // var gasEther = ethers.utils.formatEther(gasfromcontract);
    // console.log("Gas is " + gasEther);
    // //convert gasEther to wei
    // var gasWei = ethers.utils.parseEther(gasEther);
    // console.log("New gas WEI is " + gasWei);

    var sumValue = ethers.utils.parseEther(nftPrice.toString());
    // console.log("Total in Wei" + sumValue);
    // Config Fee rateValue
    var feeNumberNft = numberofNFTs * 1

    // const nonce = await provider.getTransactionCount(accounts, 'latest'); //get latest nonce
    //the transaction
    // var cont = nftContract;
    // var uri = tokenURI;

    // const tx = {
    //   'from': accounts,
    //   'to': ContractID,
    //   'nonce': nonce,
    //   'gas': 500000,
    //   'data': cont.methods.mintNFT(accounts, uri).encodeABI()
    // };

    ethereum.request({
      method: "eth_sendTransaction", params: [{
        from: accounts[0],
        to: ContractID,
        gasPrice: (feeNumberNft * Gas).toString(16),
        gas: (Gas * 0.00006).toString(),
        gasLimit: 1,
        value: (numberofNFTs * sumValue).toString(16),

      }]
    }).then(function (tx) {
      console.log(tx);
    }
    ).catch(function (error) {
      console.log(error);
    }
    );
  }

  catch (error) {
    window.location.reload();
    alert(error);
  }
}

export default WalletModal;