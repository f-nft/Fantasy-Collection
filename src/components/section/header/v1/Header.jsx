import { useModal } from "../../../../utils/ModalContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../../../../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import Banner from "../../banner/v1/Banner";
import logo from "../../../../assets/images/logo.png";
import Web3 from 'web3';
import { NFTCONTRACT,STAKINGCONTRACT } from '../../../../common/config/config';
import { BSCNFTCONTRACT } from "../../../../common/config/bscconfig";
import { ETHNFTCONTRACT } from "../../../../common/config/ethconfig";
import ABI from '../../../../common/config/ABI.json';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { rinkebyContract } from "../../../../common/config/ethconfig";
import { BSCTESCONTRACT } from "../../../../common/config/bscconfig";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import { Link, NavLink} from "react-router-dom";
import VAULTABI from "../../../../common/config/VAULTABI.json";


const providerOptions = {
  binancechainwallet: {
    package: true
  },
  metamask: {
    package: true
  },
  authereum: {
    package: Authereum // required
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa"
    }
  },

};
const web3Modal = new Web3Modal({
  network: "mainnet",
  theme: "dark",
  cacheProvider: true,
  providerOptions
});

const mumbaiRpc = "https://polygon-mumbai.g.alchemy.com/v2/c85A1Mrzx-TsgugRWrTQvUfaMz_ZDp6r"
const rinkbyRpc = "https://eth-rinkeby.alchemyapi.io/v2/uA1JtoeT1WTsNEbXcyPL1U0QCcHiSwke"
const PolygonRpc = "https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk";
const EthRpc = "https://eth-mainnet.g.alchemy.com/v2/wsIm0J69yBeB3UItacaaDKy1yOFkDcl5";
const BscRpc = "https://bsc-mainnet.nodereal.io/v1/8ed65880a0a04853ba46d115f679d4e0";
const BscTest = "https://data-seed-prebsc-1-s1.binance.org:8545/"
var contract = null

const Header = () => {
  const {
    mintButtonHandler,
    setStateCoin,
    setBalance,
    setStateContract,
    setStateWeb3,
    setStateRate,
    setStatePrice,
    setStateCrypto,
    setStateAddress,
    setStateChainId,
    walletModalHandle,
    mintModalHandle,
    isBanner,
    setStakeContract,
  } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  useEffect(() => {

    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);
  async function ConnectWallet() {
    if (isMobileMenu)
      setMobileMenu(false)
    try {
      web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect()
      if (web3Modal.cachedProvider) {
        try {
          const web3 = new Web3(provider);
          await window.ethereum.send("eth_requestAccounts");
          var accounts = await web3.eth.getAccounts();
          var account = accounts[0];
          setStateAddress(account);
          setBalance(web3.utils.fromWei(await web3.eth.getBalance(account)));

          // Get current network
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          // eslint-disable-next-line
          if (chainId == 0x89) {
            var crypto = "Polygon";
            setStateCrypto(crypto);

            var coin = "Matic";
            setStateCoin(coin);

            // Get contract instance
            setStateContract(new web3.eth.Contract(ABI, NFTCONTRACT));
            setStakeContract(new web3.eth.Contract(VAULTABI, STAKINGCONTRACT));

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
            setStakeContract(new web3.eth.Contract(VAULTABI, STAKINGCONTRACT));

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
          mintModalHandle()
        } catch (error) {
          alert(error);
        } 
      } 
      
      else {
        alert("Please connect to the blockchain");
        web3Modal.clearCachedProvider();
      }
    }
    catch (e) {
      alert(e)
    }
    return mintButtonHandler();
  } 
  return (
    <>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1924299470979517"
     crossorigin="anonymous"></script>
      <NavWrapper className="f-nft_header" id="navbar">
        <div className="container">
          {/* Main Menu Start */}
          <div className="f-nft_menu_sect">
            <div className="f-nft_menu_left_sect">
              <div className="logo">
                <NavLink to="/">
                  <img src={logo} alt="f-nft nft logo"/>
                </NavLink>
              </div>
            </div>
            <div className="f-nft_menu_right_sect f-nft_v1_menu_right_sect">
              <div className="f-nft_menu_list">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    {/* First navigate to home page and then about div */}
                    {isBanner?
                    (<a href ="/#about">About</a>):
                    (<a href ="#rewards">Rewards</a>)
                    }
                  </li>
                  <li>
                    {isBanner?
                    (<a href="/#roadmap">Roadmap</a>):
                    (<a href="#features">Features</a>)
                    }
                  </li>
                  <li>
                    {isBanner?
                    (<a href="/#team">Team</a>):
                    (<a href="#Hold">   Hold and Earn</a>)
                    }
                  </li>
                  <li>
                    {isBanner?
                    (<a href="/#faq">FAQ</a>):
                    (null)
                    }
                  </li>
                  <li>
                    <Link to="/nfts">NFT</Link>
                  </li>
                  <li className="submenu">
                    <NavLink to="# ">Blog +</NavLink>
                    <div className="sub_menu_sect">
                      <ul className="sub_menu_list">
                        {/* <li>
                        <NavLink to="/">Home One</NavLink>
                      </li>
                      <li>
                        <NavLink to="/home-two">Home Two</NavLink>
                      </li>
                      <li>
                        <NavLink to="/home-three">Home Three</NavLink>
                      </li> */}
                        <li>
                          <NavLink to="/blogs">Latest Blog</NavLink>
                        </li>
                        <li>
                          <NavLink to="/post">Blog Details</NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="f-nft_menu_btns">
                <button className="menu_btn" onClick={() => handleMobileMenu(walletModalHandle)}>
                  <MdNotes />
                </button>
                <Button sm variant="outline" className="join_btn"
                  onClick={() => {
                    window.open("https://discord.gg/58KS9smeCV", "_blank")
                  }
                  }>
                  <FaDiscord /> Join
                </Button>
                <Button
                  sm
                  variant="hovered"
                  className="connect_btn"
                  onClick={() => ConnectWallet()}
                >
                  <FaWallet /> Connect
                </Button>
              </div>
            </div>
          </div>
          {/* <!-- Main Menu END --> */}
          {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} data={ConnectWallet} />}
        </div>
      </NavWrapper>
          {isBanner&& <Banner data={ConnectWallet}/>}
    </>
  );
};

export default Header;
