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
// import { Contract, Signer, BigNumber, providers, utils } from 'ethers';
import { NFTCONTRACT } from '../../config/config';
import { ETHNFTCONTRACT } from '../../config/ethconfig';
import { BSCNFTCONTRACT } from '../../config/bscconfig';
import contract from "../../config/contract.json";
// import { STAKINGCONTRACT } from "../../config/config";
// import ABI from '../../config/ABI.json';
// import VAULTABI from '../../config/VAULTABI.json';

const { ethereum } = window;
var provider = null;
const WalletModal = () => {
  const { walletModalHandle } = useModal();
  const { mintButtonHandler, mintModalHandle } = useModal();

  async function connectWallet() {

    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,

      });

      provider = new ethers.providers.Web3Provider(window.ethereum);
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
      mintButtonHandler();

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
    mintModalHandle();
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
  var ethRate = 1 / (dataEth.price); //reduce gas price

  try {
    if (!window.ethereum.selectedAddress) {
      alert("Please unlock your MetaMask account");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    let balance = await provider.getBalance(accounts[0]);
    if (balance.lt(ethers.utils.parseEther("0.005"))) {
      alert("Please deposit at least $60 ~ 0.05 ETH / 80 Matic / 0.25 BNB to the MetaMask account");
      window.location.reload(true);
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
      var nftPrice = 1 * maticRate;
      console.log("NFT Price in Matic " + nftPrice);
      localStorage.setItem("nftPriceMatic", nftPrice);

      var gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      var gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      var gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      var Gas = gasWei * 10;
      var gasLimit = 30000;
      var gasLimitPlus = gasLimit * 5000;

    }

    // eslint-disable-next-line
    else if (chainId == 56) {
      //mint for BSC network
      ContractID = BSCNFTCONTRACT;
      nftPrice = 60 * bnbRate;
      console.log("NFT Price in BNB " + nftPrice);
      localStorage.setItem("nftPriceBNB", nftPrice);

      gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      gasWei =
        // gasWei = gasEther * 0.0000001
        ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      Gas = gasWei * 0.00000000000001;
      gasLimit = 30000;
      gasLimitPlus = gasLimit * 0.7;
    }

    // eslint-disable-next-line
    else if (chainId == 1) {
      //mit for ETH network
      ContractID = ETHNFTCONTRACT;

      nftPrice = 60 * ethRate;
      console.log("NFT Price in ETH " + nftPrice);

      localStorage.setItem("nftPriceETH", nftPrice);
      gasfromcontract = await provider.getGasPrice(16);
      //convert gas to ether
      gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);
      //convert gasEther to wei
      ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      Gas = gasWei * 0.000000001;
      gasLimit = 30000;
      gasLimitPlus = gasLimit * 0.7;
    }

    else {
      alert("Please connect to Metamask");
      window.location.reload();
      return;
    }

    // the transaction
    provider = new ethers.providers.Web3Provider(ethereum);
    //get latest nounce

    const nonce = await provider.getTransactionCount(accounts[0], "latest");
    console.log("Nounce is " + nonce);

    const signer = provider.getSigner(accounts[0]);
    console.log("signer " + signer);

    const nftContract = await new ethers.Contract(ContractID, contract.abi, signer);
    console.log("nftContract " + nftContract);

    //mint using nftContract
    var newGas = ethers.utils.parseEther(Gas.toString());
    var total = numberofNFTs * nftPrice
    var newTotal = ethers.utils.parseEther(total.toString());

    const tx2 = await nftContract.mint(accounts[0], numberofNFTs, {
      gasLimit: gasLimitPlus,
      gasPrice: newGas,
      nonce: nonce,
      value: newTotal,
    })
    console.log(tx2)
      .catch((tx2) => {
        console.log("Transaction ID:", tx2)
      })

      .then(function (transactions) {
        console.log(transactions);
      }

    ).catch(function (error) {
      console.log(error);
    }
    );
  }

  catch (error) {
    alert("Please check your wallet and try again");
    window.location.reload();
  }

}

export default WalletModal;