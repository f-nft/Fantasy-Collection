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
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import WalletConnect from "walletconnect";
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
  // const providerOptions = {
  //   binancechainwallet: { package: true },
  //   WalletConnect: {
  //     package: WalletConnect,
  //     options: {
  //       rpc:
  //       {
  //         56: 'https://bsc-dataseed1.defibit.io/'
  //       },
  //       network: 'binance',
  //       chainId: 56,
  //       infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa",
  //     },
  //   },
  //   WalletLinkConnector: {
  //     package: WalletLinkConnector,
  //     options: {
  //       appName: "f-nft Polygon",
  //       infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa",
  //       rpc: "",
  //       chainId: 137,
  //       appLogoUrl: null,
  //       darkMode: true,
  //     },
  //   },
  // };

  const { walletModalHandle } = useModal();
  const { mintButtonHandler, mintModalHandle } = useModal();

  async function connectWallet() {

    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        // providerOptions,
        darkMode: true,

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
    // define network accounts connected
    let Id = await ethereum.request({ method: 'eth_chainId' });
    if (Id == "56") {
      alert("You are connected to BSC Network!");
    }
    else if (Id == "1") {
      alert("You are connected to ETH Network!");
    }
    else if (Id == "137") {
      alert("You are connected to Polygon Network!");
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
              <button onClick={() => walletModalHandle(1)}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please select a wallet to connect for start Minting your NFTs
              </p>
              <div className="wallet_list">
                <a href="# " onClick={() => connectWallet()} >
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
  document.getElementById('requestPermissionsButton', requestPermissions);

  function requestPermissions() {
    ethereum
      .request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
      .then((permissions) => {
        const accountsPermission = permissions.find(
          (permission) => permission.parentCapability === 'eth_accounts'
        );
        if (accountsPermission) {
          console.log('eth_accounts permission successfully requested!');
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Permissions needed to continue.');
        } else {
          console.error(error);
        }
      });
  }

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
    localStorage.setItem("walletAddress", accounts[0]);
    let balance = await provider.getBalance(accounts[0]);

    if (balance.lt(ethers.utils.parseEther("0.00000"))) {
      alert("Please deposit at least $60 ~ 0.05 ETH / 80 Matic / 0.25 BNB to the MetaMask account");
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
      // var network = "https://polygonscan.com/";
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
      var Gas = gasWei;
      var gasLimit = 30000;
      var gasLimitPlus = gasLimit * 5000;
    }

    // eslint-disable-next-line
    else if (chainId == 56) {
      //mint for BSC network
      ContractID = BSCNFTCONTRACT;
      // network = "https://bscscan.com/";
      nftPrice = 60 * bnbRate;
      console.log("NFT Price in BNB " + nftPrice);
      localStorage.setItem("nftPriceBNB", nftPrice);
      gasfromcontract = await provider.getGasPrice();

      //convert gas to ether
      gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);

      //convert gasEther to wei
      gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      Gas = gasWei;
      gasLimit = 30000;
      gasLimitPlus = gasLimit * 0.7;
    }

    // eslint-disable-next-line
    else if (chainId == 1) {
      //mit for ETH network
      ContractID = ETHNFTCONTRACT;
      // network = "https://etherscan.io/";
      nftPrice = 60 * ethRate;
      console.log("NFT Price in ETH " + nftPrice);
      localStorage.setItem("nftPriceETH", nftPrice);
      gasfromcontract = await provider.getGasPrice(16);

      //convert gas to ether
      gasEther = ethers.utils.formatEther(gasfromcontract);
      console.log("Gas is " + gasEther);

      //convert gasEther to wei
      gasWei = ethers.utils.parseEther(gasEther);
      console.log("New gas WEI is " + gasWei);
      Gas = gasWei;
      gasLimit = 30000;
      gasLimitPlus = gasLimit * 0.7;
    }

    else {
      alert("Please connect to Metamask");
      return;
    }

    // the transaction
    //sign transactions with the blockchain and smart contract1

    provider = new ethers.Signer(ethereum);
    console.log();
    var account = await provider.getBalance(ethereum);
    console.log();

    var jsonRpcProvider = provider.getSigner(account.toString());
    console.log();

    var signer = new provider.Signer(jsonRpcProvider);
    console.log();

    var contract1 = new provider.Contract(ContractID, contract.abi, signer);
    console.log(contract1);
    await ethers.Signer.signed(contract1);
    console.log();

    await provider.getBlock("pending").then((block) => {
      console.log();
      var baseFee = Number(block.baseFeePerGas);
      var maxPriority = Number(block.maxFeePerGas);
      var maxFee = baseFee + maxPriority;
      var total = numberofNFTs * nftPrice;
      var totals = total + baseFee;
      console.log();

      //peform minting from conract
      contract1.methods.mint(accounts, numberofNFTs)
        .send({
          from: String("walletAddress"),
          fee: String(Gas),
          value: String(totals),
          maxFeePerGas: String(maxFee),
          maxPriorityFeePerGas: String(maxPriority),
        });
      console.log();
    })
      .catch((error) => {
        alert(error)
        window.location.reload();
      })
      .catch((err) => alert(err, "Please check your wallet"));
  } catch (error) {
    alert("Please check your wallet and try again");
  }
}

export default WalletModal;