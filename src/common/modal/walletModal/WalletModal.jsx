import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
// import formatic from "../../../assets/images/icon/Formatic.svg";
// import trustWalletIcon from "../../../assets/images/icon/Trust_Wallet.svg";
// import walletConnect from "../../../assets/images/icon/WalletConnect.svg";
// import Web3Modal from "web3modal";
// import { ethers } from 'ethers';
import Web3 from 'web3';
import { NFTCONTRACT } from '../../config/config';
import ABI from '../../config/ABI.json';


// var provider = null;
var contract = null;
const WalletModal = () => {
  const { walletModalHandle,
    mintButtonHandler,
    setWalletAddress,
    setBalance,
    // setStateaccouts,
    // setStateprovider,
    setStateContract
  } = useModal();

  // async function connectWallet() {



  //   try {
  //     let web3Modal = new Web3Modal({
  //       cacheProvider: false,

  //     });

  //     provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const web3ModalInstance = await web3Modal.connect();
  //     const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
  //     var accounts = await web3ModalProvider.listAccounts();
  //     setStateprovider(provider)
  //     setStateaccouts(accounts)

  //     //get balance
  //     const balance = await web3ModalProvider.getBalance(accounts[0]);
  //     //convert balance to ether
  //     const etherBalance = ethers.utils.formatEther(balance);
  //     console.log(etherBalance);
  //     mintButtonHandler();

  //     //close current modal
  //     walletModalHandle();
  //     //if wallet is connected then set the wallet address in local storage
  //     setWalletAddress(accounts[0]);
  //     //set balance in local storage
  //     setBalance(etherBalance);

  //     try {
  //       //agree network chain ID to which user is connected
  //       // eslint-disable-next-line
  //         const chainId = await web3ModalProvider.getNetwork().then(function (network) {
  //         console.log(network.chainId)
  //         localStorage.setItem("chainId", network.chainId);

  //       }
  //       ).catch(function (error) {
  //         console.log(error)
  //         window.location.reload();
  //       }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //   }


  // }

  async function connectWallet2() {
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
      setWalletAddress(account);
      setBalance(web3.utils.fromWei(await web3.eth.getBalance(account)));
      walletModalHandle();

      //get contract instance
      try {
        contract = new web3.eth.Contract(ABI, NFTCONTRACT);
        mintButtonHandler();
      }
      catch (error) {
        console.log(error)
      }
      setStateContract(contract);
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
              <h2>CONNECT WALLETss</h2>
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please select a wallet to connect for start Minting your NFTs
              </p>
              <div className="wallet_list">
                <a href="# " onClick={connectWallet2} >
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
                <a href="# ">PRIV_KEYacy Policy</a>
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