import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';
import { NFTCONTRACT } from '../../config/config';
import { ETHNFTCONTRACT } from '../../config/ethconfig';
import { BSCNFTCONTRACT } from '../../config/bscconfig';
import ABI from '../../config/ABI.json';

// import { STAKINGCONTRACT } from "../../config/config";
// import formatic from "../../../assets/images/icon/Formatic.svg";
// import trustWalletIcon from "../../../assets/images/icon/Trust_Wallet.svg";
// import walletConnect from "../../../assets/images/icon/WalletConnect.svg";
// import VAULTABI from '../../config/VAULTABI.json';

const { ethereum } = window;

const WalletModal = () => {
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

      const provider = new ethers.providers.Web3Provider(ethereum);
      const web3ModalInstance = await web3Modal.connect(provider);
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      var accounts = await web3ModalProvider.listAccounts();

      // get balance
      const balance = await web3ModalProvider.getBalance(accounts[0]);
      //convert balance to ether
      const etherBalance = ethers.utils.formatEther(balance);
      console.log(etherBalance);
      mintButtonHandler();

      // close current modal
      walletModalHandle();
      // if wallet is connected then set the wallet address in local storage
      localStorage.setItem("walletAddress", accounts[0]);
      // set balance in local storage
      localStorage.setItem("balance", etherBalance);

      try {
        // agree network chain ID to which user is connected
        // eslint-disable-next-line
        const chainId = await web3ModalProvider.getNetwork().then(function (network) {
          console.log(network.chainId)
          //get typeof chainID
          console.log("type of chainID", typeof network.chainId)
          localStorage.setItem("chainId", network.chainId);
        })
          .catch(function (error) {
          console.log(error)
          window.location.reload();
          })
      }
      catch (error) {
        console.log(error)
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
      console.log(error)
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
                <a href="# ">Priacy Policy</a>
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
  )
}

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

  const accounts = await ethereum.request({ method: "eth_accounts" });
  const Gas = await ethereum.request({ method: "eth_estimateGas" });

  try {
    if (!window.ethereum.selectedAddress) {
      alert("Please unlock your MetaMask account");
      return
    }


    var ContractID = null;

    // get chainID from local storage
    const chainId = localStorage.getItem("chainId");

    // eslint-disable-next-line
    if (chainId == 137) {
      //mint for polygon network
      ContractID = NFTCONTRACT;
      var nftPrice = 60 * maticRate;
      console.log("NFT Price in Matic " + nftPrice);

    }

    // eslint-disable-next-line
    else if (chainId == 56) {
      //mint for BSC network
      ContractID = BSCNFTCONTRACT;
      nftPrice = 60 * bnbRate;
      console.log("NFT Price in BNB " + nftPrice);

    }

    // eslint-disable-next-line
    else if (chainId == 1) {
      //mit for ETH network
      ContractID = ETHNFTCONTRACT;
      nftPrice = 60 * ethRate;
      console.log("NFT Price in ETH " + nftPrice);

    }

    else {
      alert("Please connect to Metamask");
      return;
    }

    const ETH_ENDPOINT = "https://lively-autumn-frost.discover.quiknode.pro/af0fdef077dab287f8be2f7ab319b2d4049f170d"
    const POLYGON_ENDPOINT = "https://nameless-bitter-brook.matic.discover.quiknode.pro/c152a3f5c3fafb11d729cdae4830d11da9550d42"
    const BSC_HTTP_ENDPOINT = "https://frosty-bold-smoke.bsc.discover.quiknode.pro/83f5a45165566ef30844a7084dbf8bd9cec50e9a"

    const numberNft = numberofNFTs.toString();
    const sumValues = ethers.utils.parseEther((numberofNFTs * nftPrice).toString());
    console.log("Total Payment is " + sumValues.toString())
    const account = accounts.toString();
    const bscprovider = new ethers.providers.JsonRpcProvider(BSC_HTTP_ENDPOINT);
    const bscsigner = bscprovider.getSigner(account, bscprovider);
    console.log()

    const polygonRpcProvider = new ethers.providers.JsonRpcProvider(POLYGON_ENDPOINT);
    const polygonProvider = new ethers.providers.getDefaultProvider(POLYGON_ENDPOINT);
    const polygonSigner = polygonRpcProvider.getSigner(account, polygonRpcProvider);
    
    const ethprovider = new ethers.providers.JsonRpcProvider(ETH_ENDPOINT);
    const ethSigner = ethprovider.getSigner(account, ethprovider);

    const contractAbi = ABI;
    const contract = ContractID.toString();
    const contractBscInstance = new Contract(contract, contractAbi, bscsigner);
    const contractEthInstance = new Contract(contract, contractAbi, ethSigner);
    const contractPolygonInstance = new Contract(contract, contractAbi, polygonSigner);

    var _mintAmount = numberNft;
    var totalAmount = _mintAmount * nftPrice;
    await ethereum.getBlock("pending").then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(Gas);
            var maxFee = baseFee + maxPriority;
            contract.methods.mint(account, _mintAmount).send({
              from: account,
              value: String(totalAmount),
              maxFeePerGas: maxFee,
              maxPriorityFeePerGas: maxPriority,
            });
          })
          .catch((err) => alert(err.message));
  } catch (e) {
    console.log("Error Caught in Catch Statement: ", e)
  }
}

export default WalletModal;