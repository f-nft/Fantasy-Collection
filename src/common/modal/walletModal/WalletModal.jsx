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
// import { PRIV_KEY } from "../../config/.priv";
// import VAULTABI from '../../config/VAULTABI.json';

const { ethereum } = window;

const WalletModal = () => {
  const { walletModalHandle } = useModal();
  const { mintButtonHandler, mintModalHandle } = useModal();

  async function connectWallet() {
    if (window.ethereum) {
      try {
        let web3Modal = new Web3Modal({
          network: "mainnet",
          cacheProvider: false,
          // providerOptions,
          darkMode: true,

        })

        // close current modal
        walletModalHandle();


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
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          console.log(accounts);
          var account = accounts[0];
          console.log("Account selected " + account);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const web3ModalInstance = await web3Modal.connect(provider);
          const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);

          // const nftContract = new Contract(NFTCONTRACT, ABI, signer);
          // const bscContract=new Contract(BSCNFTCONTRACT,ABI,signer);
          // const StakeContract = new Contract(STAKINGCONTRACT, VAULTABI, signer);
          // const totalstaked = await StakeContract.totalStaked();
          // const totalstakedwei = totalstaked.toString();
          // console.log(totalstakedwei);

          // get balance
          const balance = await web3ModalProvider.getBalance(accounts[0]);
          //convert balance to ether
          const etherBalance = ethers.utils.formatEther(balance);
          console.log(etherBalance);
          // if wallet is connected then set the wallet address in local storage
          localStorage.setItem("walletAddress", account[0]);
          // set balance in local storage
          localStorage.setItem("balance", etherBalance);
          mintButtonHandler();
        } catch (err) {
          alert(err.message);
          return account
        }
      } catch (error) {
        console.log(error)
      }
      mintModalHandle();
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

    const contractAbi = ABI;
    const contract = ContractID.toString();

    const numberNft = numberofNFTs.toString();
    const sumValues = ethers.utils.parseEther((numberofNFTs * nftPrice).toString());
    console.log("Total Payment is " + sumValues.toString())

    const wallets = ("walletAddress").toString();
    // const PRIV = PRIV_KEY
    const bscprovider = new ethers.providers.JsonRpcProvider(BSC_HTTP_ENDPOINT);
    const bscsigner = bscprovider.getSigner(wallets, bscprovider);
    const contractBscInstance = new Contract(ContractID, contractAbi, bscsigner);
    console.log()

    const polygonRpcProvider = new ethers.providers.JsonRpcProvider(POLYGON_ENDPOINT);
    const polygonProvider = new ethers.providers.getDefaultProvider(POLYGON_ENDPOINT);
    const polygonSigner = polygonRpcProvider.getSigner(wallets, polygonRpcProvider);
    const contractPolygonInstance = new Contract(contract, contractAbi, polygonSigner);
    console.log()

    const ethprovider = new ethers.providers.JsonRpcProvider(ETH_ENDPOINT);
    const ethSigner = ethprovider.getSigner(wallets, ethprovider);
    const contractEthInstance = new Contract(contract, contractAbi, ethSigner);
    console.log()

    
    // eslint-disable-next-line
    //   if (chainId == 56) {
    //     async function getWallet(PRIV) {
    //       let wallet = await new ethers.Wallet(PRIV, bscprovider)
    //       console.log("wallet " + wallet)
    //       return wallet
    //     }
    //     async function getGasPrice() {
    //       let feeData = await bscprovider.getGasPrice()
    //       console.log("feeData " + feeData)
    //       return feeData.bscsigner
    //     }

    //     async function getContractInfo(index, id) {
    //       let contract = await contractBscInstance.getERC1155byIndexAndId(index, id)
    //       console.log("contract " + contract)
    //       return contract;
    //     }

    //     async function getNonce(signer) {
    //       return (await signer).getTransactionCount("pending")
    //     }
    //     console.log("signer " + bscsigner)
    //     let wallet = getWallet(PRIV)
    //     let nonce = await getNonce(wallet)
    //     let gasFee = await getGasPrice()
    //     const bscSinger = contractBscInstance.connect(bscsigner, {
    //       nonce: nonce,
    //       chainId: "chainID"
    //     })
    //     console.log()
    //     const rawTxn = await bscSinger.functions.mint(wallets, numberNft, {
    //       from: wallet,
    //       gasPrice: gasFee,
    //       nonce: nonce
    //     })
    //     console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
    //     const signedTxn = (await wallet).sendTransaction(rawTxn)
    //     const reciept = (await signedTxn).wait()
    //     if (reciept) {
    //       console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
    //         (await signedTxn).hash + '\n' + "Block Number:" +
    //         (await reciept).blockNumber + '\n' + "Navigate to https://bscscan.com/tx/" +
    //         (await signedTxn).hash, "to see your transaction")
    //     } else {
    //       console.log("Error submitting transaction")
    //     }
    //   }

    //   // eslint-disable-next-line
    //   else if (chainId == 1) {
    //     async function getWallet(PRIV) {
    //       let wallet = new ethers.Wallet(PRIV, ethprovider)
    //       return wallet
    //     }

    //     async function getGasPrice() {
    //       let feeData = await ethprovider.getGasPrice()
    //       return feeData.gasPrice
    //     }

    //     async function getContractInfo(index, id) {
    //       let contract = await contractEthInstance.getERC1155byIndexAndId(index, id)
    //       return contract;
    //     }

    //     async function getNonce(signer) {
    //       return (await signer).getTransactionCount("pending")
    //     }

    //     const wallet = await getWallet(PRIV);
    //     const nonce = await getNonce(wallet);
    //     const gasFee = await getGasPrice(wallets);

    //     const ethSinger = contractEthInstance.connect(ethSigner, {
    //       gasPrice: gasFee,
    //       maxFeePerGas: gasFee,
    //       nonce: nonce
    //     });
    //     // const fee = ethers.utils.parseEther((feeData.gasPrice * 0.001).toString());

    //     let rawTxn = await ethSinger.methods.mint(ethSigner, numberNft, {
    //       gasPrice: gasFee,
    //       nonce: nonce,
    //       value: sumValues
    //     })

    //     console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
    //     const signedTxn = (await wallet).sendTransaction(rawTxn)
    //     const reciept = (await signedTxn).wait()
    //     if (reciept) {
    //       console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
    //         (await signedTxn).hash + '\n' + "Block Number:" +
    //         (await reciept).blockNumber + '\n' + "Navigate to https://etherscan.io/tx/" +
    //         (await signedTxn).hash, "to see your transaction")
    //     } else {
    //       console.log("Error submitting transaction")
    //     }
    //   }

    //   // eslint-disable-next-line
    //   else if (chainId == 137) {
    //     async function getWallet(PRIV) {
    //       let wallet = new ethers.Wallet(PRIV, polygonprovider)
    //       return wallet
    //     }

    //     async function getGasPrice() {
    //       let feeData = await polygonprovider.getGasPrice()
    //       return feeData.gasPriceinWei
    //     }

    //     async function getContractInfo(index, id) {
    //       let contract = await contractPolygonInstance.getERC1155byIndexAndId(index, id)
    //       return contract;
    //     }

    //     async function getNonce(signer) {
    //       return (await signer).getTransactionCount("pending")
    //     }

    //     const wallet = await getWallet(PRIV_KEY);
    //     const nonce = await getNonce(wallet);
    //     const gasFee = await getGasPrice(wallets);
    //     const polySinger = contractPolygonInstance.connect(wallets, {
    //       gasPrice: gasFee,
    //       maxFeePerGas: gasFee,
    //       nonce: nonce
    //     });
    //     // const fee = ethers.utils.parseEther((feeData.gasPrice * 0.001).toString());

    //     let rawTxn = await polySinger.functions.mint(wallets, numberNft, {
    //       gasPrice: gasFee,
    //       nonce: nonce,
    //       value: sumValues
    //     })

    //     console.log("...Submitting transaction with gas price of:",
    //       ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
    //     const signedTxn = (await wallet).sendTransaction(rawTxn)
    //     const reciept = (await signedTxn).wait()
    //     if (reciept) {
    //       console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
    //         (await signedTxn).hash + '\n' + "Block Number:" +
    //         (await reciept).blockNumber + '\n' + "Navigate to https://etherscan.io/tx/" +
    //         (await signedTxn).hash, "to see your transaction")
    //     } else {
    //       console.log("Error submitting transaction")
    //     }
    //   }

    //   else {
    //     console.log("Wrong network - Connect to configured BSC, ETH, or Polygon first!")
    //   }

    try {
      var accounts = "walletAddress";
      var _mintAmount = numberNft;
      var totalAmount = _mintAmount * nftPrice;
      await ethers.Contract.getBlock("pending").then((block) => {
        var baseFee = Number(block.baseFeePerGas);
        var maxPriority = Number(Gas);
        var maxFee = baseFee + maxPriority;
        contract.methods.mint(accounts, _mintAmount).send({
          from: accounts,
          value: String(totalAmount),
          maxFeePerGas: maxFee,
          maxPriorityFeePerGas: maxPriority,
        });
      })
        .catch((err) => alert(err.message));
    } catch (error) {
      alert(error);
    }
  } catch (e) {
    console.log("Error Caught in Catch Statement: ", e)
  }
}

export default WalletModal;