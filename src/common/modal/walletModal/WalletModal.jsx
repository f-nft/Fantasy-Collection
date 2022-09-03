import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
import Web3 from 'web3';
import { NFTCONTRACT } from '../../config/config';
import { BSCNFTCONTRACT } from "../../config/bscconfig";
import { ETHNFTCONTRACT } from "../../config/ethconfig";
import ABI from '../../config/ABI.json';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { rinkebyContract } from "../../config/ethconfig";
import { BSCTESCONTRACT } from "../../config/bscconfig";
// import { ethers } from "ethers";

const mumbaiRpc = "https://polygon-mumbai.g.alchemy.com/v2/c85A1Mrzx-TsgugRWrTQvUfaMz_ZDp6r"
const rinkbyRpc = "https://eth-rinkeby.alchemyapi.io/v2/uA1JtoeT1WTsNEbXcyPL1U0QCcHiSwke"
const PolygonRpc = "https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk";
const EthRpc = "https://eth-mainnet.g.alchemy.com/v2/wsIm0J69yBeB3UItacaaDKy1yOFkDcl5";
const BscRpc = "https://bsc-mainnet.nodereal.io/v1/8ed65880a0a04853ba46d115f679d4e0";
const BscTest = "https://data-seed-prebsc-1-s1.binance.org:8545/"
var contract = null;

const WalletModal = () => {
  const { walletModalHandle,
    mintButtonHandler,
    mintModalHandle,
    setStateCoin,
    setBalance,
    setStateContract,
    setStateWeb3,
    setStateRate,
    setStatePrice,
    setStateCrypto,
    setStateAddress,
    setStateChainId
  } = useModal();

  async function ConnectWallet() {

    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
      setStateAddress(account);
      console.log(account);
      setBalance(web3.utils.fromWei(await web3.eth.getBalance(account)));
      walletModalHandle();

      // Get current network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      //eslint-disable-next-line
      if (chainId == 0x89) {
        var crypto = "Polygon";
        setStateCrypto(crypto);
        console.log(crypto);

        var coin = "Matic";
        setStateCoin(coin);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, NFTCONTRACT);
        setStateContract(contract);

        // Get rpc instance
        const Web3Alc = createAlchemyWeb3(PolygonRpc);
        setStateWeb3(Web3Alc);

        // Get rate
        var rate = localStorage.getItem("maticRate");
        setStateRate(rate);

        // Get price
        var price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);
      }

      // eslint-disable-next-line
      else if (chainId == 0x1) {
        crypto = "Ethereum";
        setStateCrypto(crypto);
        coin = "ETH";

        setStateCoin(coin);
        console.log(crypto);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, ETHNFTCONTRACT);
        setStateContract(contract);

        // Get rpc instance
        const Web3Alc = createAlchemyWeb3(EthRpc);
        setStateWeb3(Web3Alc);

        // Get rate
        rate = localStorage.getItem("ethRate");
        setStateRate(rate);

        // Get price
        price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);


      }
      // eslint-disable-next-line
      else if (chainId == 0x38) {
        crypto = "Binance Chain";
        setStateCrypto(crypto);
        console.log(crypto);

        coin = "BNB"
        setStateCoin(coin);
        console.log(crypto);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, BSCNFTCONTRACT);
        setStateContract(contract)
        const Web3Alc = new Web3.providers.HttpProvider(BscTest);
        setStateWeb3(Web3Alc);

        // Get rate
        rate = localStorage.getItem("bnbRate");
        setStateRate(rate);

        // Get price
        price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);

      }
      // eslint-disable-next-line
      else if (chainId == 0x61) {
        crypto = "Binance Chain Testnet";
        setStateCrypto(crypto);
        console.log(crypto);

        coin = "BNB"
        setStateCoin(coin);
        console.log(crypto);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, BSCTESCONTRACT);
        setStateContract(contract)
        const Web3Alc = new Web3.providers.HttpProvider(BscRpc);
        setStateWeb3(Web3Alc);

        // Get rate
        rate = localStorage.getItem("bnbRate");
        setStateRate(rate);

        // Get price
        price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);

    }
    
      // eslint-disable-next-line
      else if (chainId == 0x4) {
        crypto = "Rinkeby";
        setStateCrypto(crypto);
        console.log(crypto);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, rinkebyContract);
        setStateContract(contract);

        // Get rpc instance
        const Web3Alc = createAlchemyWeb3(rinkbyRpc);
        setStateWeb3(Web3Alc);

        // Get rate
        rate = localStorage.getItem("ethRate");
        setStateRate(rate);

        // Get price
        price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);

      }
            
      // eslint-disable-next-line
      else if (chainId == 0x80001) {
        crypto = "Mumbai";
        setStateCrypto(crypto);
        console.log(crypto);

        // Get contract instance
        contract = new web3.eth.Contract(ABI, "0x7970b2AC48B547b2aA8B37F860E2271134683B07");
        setStateContract(contract);

        // Get rpc instance
        const Web3Alc = createAlchemyWeb3(mumbaiRpc);
        setStateWeb3(Web3Alc);

        // Get rate
        rate = localStorage.getItem("maticRate");
        setStateRate(rate);

        // Get price
        price = 60 * rate;
        setStatePrice(price);

        // Show Crypto of ChainId connected
        setStateChainId(chainId);

      }

      else
        alert("Please connect to the blockchain");
    }
    return mintButtonHandler();
  }

  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
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
                <a href="# " onClick={ConnectWallet} onSubmit={() => mintModalHandle()} >
                  <img src={metamaskIcon} alt="Metamask" />
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
  )
}

export default WalletModal;