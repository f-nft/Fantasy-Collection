import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
// import Countdown from "../../../components/section/countdown/countDown";
import { useEffect } from "react";
import { ethers } from 'ethers';
import Web3 from "web3";
// import { Contract, Signer, BigNumber, providers, utils } from 'ethers';
 import { NFTCONTRACT } from '../../config/config';
// import { ETHNFTCONTRACT } from '../../config/ethconfig';
// import { BSCNFTCONTRACT } from '../../config/bscconfig';
// import { STAKINGCONTRACT } from "../../config/config";
// import ABI from '../../config/ABI.json';
// import { PRIV_KEY } from "../../config/.priv";

// const PRIV_KEY="61b933b184c4ca89486f0803c331e03a99b6ead45f2e6954fed8a522a8266075"

const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const { mintModalHandle,walletAddress,
    stateContract

   } = useModal();
  const reload = () => window.location.reload();
  const [maticRate,setMaticRate]=useState(0);
  //eslint-disable-next-line
  const [bnbRate,setBnBRate]=useState(0);
  //eslint-disable-next-line
  const [ethRate,setEthRate]=useState(0);
  var counts = count.toFixed(1);
  useEffect(() => {
    async function getData() {
      const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
      const responseEth = await fetch(ethPrice, { cache: "force-cache" })
      var data = await responseEth.json()
      console.log("ETH Price " + data.price); //data.price is the price of MATIC in USDT
      var ethRate = 1 / data.price;
      localStorage.setItem("ethRate", ethRate);
    }
    getData();
    getRates()  
  }, []);
  const ethNewRate = localStorage.getItem("ethRate") * 60;
  const usdRate = 60;
  var num = ethNewRate;
  var n = num.toFixed(5)
  console.log(ethNewRate);

//   async function mint(numberofNFTs, e) {
//   try {
//     if (!window.ethereum.selectedAddress) 
//          return alert("Please unlock your MetaMask account");
     
//     // get accounts fromm useState in ModalContext
//     const accounts = Stateaccounts

//     // get chainID from local storage
//     const chainId = localStorage.getItem("chainId");

//     // eslint-disable-next-line
//     if (chainId == 137) {
//       //mint for polygon network
//     setContractID(NFTCONTRACT)
//       var nftPrice = 60 * maticRate;
//       console.log("NFT Price in Matic " + nftPrice);

//     }

//     // eslint-disable-next-line
//     else if (chainId == 56) {
//       //mint for BSC network
//     setContractID(BSCNFTCONTRACT)
//       nftPrice = 60 * bnbRate;
//       console.log("NFT Price in BNB " + nftPrice);

//     }

//     // eslint-disable-next-line
//     else if (chainId == 1) {
//       //mit for ETH network
//     setContractID(ETHNFTCONTRACT)
//       nftPrice = 60 * ethRate;
//       console.log("NFT Price in ETH " + nftPrice);

//     }

//     else {
//       alert("Please connect to Metamask");
//       return;
//     }

//     const ETH_ENDPOINT = "https://lively-autumn-frost.discover.quiknode.pro/af0fdef077dab287f8be2f7ab319b2d4049f170d"
//     const POLYGON_ENDPOINT = "https://nameless-bitter-brook.matic.discover.quiknode.pro/c152a3f5c3fafb11d729cdae4830d11da9550d42"
//     const BSC_HTTP_ENDPOINT = "https://frosty-bold-smoke.bsc.discover.quiknode.pro/83f5a45165566ef30844a7084dbf8bd9cec50e9a/"

//     const numberNft = numberofNFTs.toString();
//     const sumValues = ethers.utils.parseEther((numberofNFTs * nftPrice).toString());
//     console.log("Total Payment is " + sumValues.toString())
//     const wallets = accounts.toString();
//     const PRIV = PRIV_KEY
//     const bscprovider = new ethers.providers.JsonRpcProvider(BSC_HTTP_ENDPOINT);

//     const bscsigner = bscprovider.getSigner(wallets, bscprovider);

//     const polygonprovider = new ethers.providers.JsonRpcProvider(POLYGON_ENDPOINT);
 
//     const polygonsigner = polygonprovider.getSigner(wallets, polygonprovider);

//     const ethprovider = new ethers.providers.JsonRpcProvider(ETH_ENDPOINT);
   
//     const ethSigner = ethprovider.getSigner(wallets, ethprovider);
//     console.log(polygonsigner)

//     const contractAbi = ABI;
//     const contract = ContractID.toString();
//     const contractBscInstance = new Contract(ContractID, contractAbi, bscsigner);
//     const contractEthInstance = new Contract(contract, contractAbi, ethSigner);
//     const contractPolygonInstance = new Contract(contract, contractAbi, polygonsigner);

//     console.log(contractPolygonInstance)

//     //call the contract to mint the NFT


//     //get account balance from contractPolygonInstance 
//     // const balance = await contractPolygonInstance.balanceOf(wallets);
//     // return alert("Account balance is " + balance.toString())
    
//     // eslint-disable-next-line
//     // if (chainId == 56) {
//     //   async function getWallet(PRIV) {
  
//     //     let wallet = await new ethers.Wallet(PRIV, bscprovider)
//     //     console.log("wallet " + wallet)
//     //     return wallet
//     //   }
//     //   async function getGasPrice() {
//     //     let feeData = await bscprovider.getGasPrice()
//     //     console.log("feeData " + feeData)
//     //     return feeData.bscsigner
//     //   }

//     //   async function getContractInfo(index, id) {
//     //     let contract = await contractBscInstance.getERC1155byIndexAndId(index, id)
//     //     console.log("contract " + contract)
//     //     return contract;
//     //   }
      
//     //   async function getNonce(signer) {
//     //     return (await signer).getTransactionCount("pending")
//     //   }
//     //   console.log("signer " + bscsigner)
//     //   let wallet = getWallet(PRIV)
//     //   let nonce = await getNonce(wallet)
//     //   let gasFee = await getGasPrice()
//     //   const bscSinger = contractBscInstance.connect(bscsigner, {
//     //     nonce: nonce,
//     //     chainId: "chainID"
//     //   })
//     //   const rawTxn = await bscSinger.functions.mint(wallets, numberNft, {
//     //     from: wallet,
//     //     gasPrice: gasFee,
//     //     nonce: nonce
//     //   })
//     //   console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
//     //   const signedTxn = (await wallet).sendTransaction(rawTxn)
//     //   const reciept = (await signedTxn).wait()
//     //   if (reciept) {
//     //     console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
//     //       (await signedTxn).hash + '\n' + "Block Number:" +
//     //       (await reciept).blockNumber + '\n' + "Navigate to https://bscscan.com/tx/" +
//     //       (await signedTxn).hash, "to see your transaction")
//     //   } else {
//     //     console.log("Error submitting transaction")
//     //   }
//     // }

//     // // eslint-disable-next-line
//     // else if (chainId == 1) {
//     //   async function getWallet(PRIV) {
//     //     let wallet = new ethers.Wallet(PRIV, ethprovider)
//     //     return wallet
//     //   }

//     //   async function getGasPrice() {
//     //     let feeData = await ethprovider.getGasPrice()
//     //     return feeData.gasPrice
//     //   }

//     //   async function getContractInfo(index, id) {
//     //     let contract = await contractEthInstance.getERC1155byIndexAndId(index, id)
//     //     return contract;
//     //   }

//     //   async function getNonce(signer) {
//     //     return (await signer).getTransactionCount("pending")
//     //   }

//     //   const wallet = await getWallet(PRIV);
//     //   const nonce = await getNonce(wallet);
//     //   const gasFee = await getGasPrice(wallets);

//     //   const ethSinger = contractEthInstance.connect(ethSigner, {
//     //     gasPrice: gasFee,
//     //     maxFeePerGas: gasFee,
//     //     nonce: nonce
//     //   });
//     //   // const fee = ethers.utils.parseEther((feeData.gasPrice * 0.001).toString());
//     //   alert("gasPrice " + gasFee)
//     //   let rawTxn = await ethSinger.methods.mint(ethSigner, numberNft, {
//     //     gasPrice: gasFee,
//     //     nonce: nonce,
//     //     value: sumValues
//     //   })

//     //   console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
//     //   const signedTxn = (await wallet).sendTransaction(rawTxn)
//     //   const reciept = (await signedTxn).wait()
//     //   if (reciept) {
//     //     console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
//     //       (await signedTxn).hash + '\n' + "Block Number:" +
//     //       (await reciept).blockNumber + '\n' + "Navigate to https://etherscan.io/tx/" +
//     //       (await signedTxn).hash, "to see your transaction")
//     //   } else {
//     //     console.log("Error submitting transaction")
//     //   }
//     // }

//     // eslint-disable-next-line
//      if (chainId == 137) {
//       async function getWallet(PRIV) {
//         let wallet = new ethers.Wallet(PRIV_KEY, polygonprovider)
//         return wallet
//       }

//       async function getGasPrice() {
//         let feeData = await polygonprovider.getGasPrice()
//         return feeData
//       }

//       async function getContractInfo(index, id) {
//         let contract = await contractPolygonInstance.getERC1155byIndexAndId(index, id)
//         return contract;
//       }

//       async function getNonce(signer) {
//         return (await signer).getTransactionCount("pending")
//       }
//       const wallet = await getWallet(PRIV_KEY);
//       const nonce = await getNonce(wallet);
//       const gasFee = await getGasPrice(wallets);
//       const polySinger = contractPolygonInstance.connect(wallets, {
//         gasPrice: gasFee,
//         maxFeePerGas: gasFee,
//         nonce: nonce
//       });
      
//       let tx={
//         gasLimit: 60000,
//         gasPrice: ethers.utils.parseEther((gasFee * 0.001).toString()),
//         from: wallets,
//         nonce: nonce,
//       }
//       //sign the transaction
  

//       let signedTn =await wallet.signTransaction(tx,PRIV_KEY)
//       setRespond(signedTn)
//       //use sendsignedTransaction to send the transaction
//       const reciept2 = polySinger.getTransactionCount()
//       console.log("reciept2 " + reciept2)
      


     
//       //wait till Respond state is not empty
 
//       // let rawT2xn = await polySinger.functions.mint(accounts, numberNft,tx)
//       console.log("...Submitting transaction ....")
//       //send Raw transaction
//     console.log(wallet)
//     return
      

//       // let rawTxn = await polySinger.functions.mint(wallets, numberNft, {
//       //   gasPrice: gasFee,
//       //   nonce: nonce,
//       //   value: sumValues
//       // })

//       // console.log("...Submitting transaction with gas price of:",
//       //   ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)
//       // const signedTxn = (await wallet).sendTransaction(rawTxn)
//       // const reciept = (await signedTxn).wait()
//       // if (reciept) {
//       //   console.log("Transaction is successful!!!" + '\n' + "Transaction Hash:",
//       //     (await signedTxn).hash + '\n' + "Block Number:" +
//       //     (await reciept).blockNumber + '\n' + "Navigate to https://etherscan.io/tx/" +
//       //     (await signedTxn).hash, "to see your transaction")
//       // } else {
//       //   console.log("Error submitting transaction")
//       // }
//     }

//     else {
//       console.log("Wrong network - Connect to configured BSC, ETH, or Polygon first!")
//     }
//   } catch (e) {
//     console.log("Error Caught in Catch Statement: ", e)
//   }

// }
  async function mint2(numberofNFTs)
  {
    var contract=stateContract;
    var _mintamount=numberofNFTs; 
    var nftPrice = 0.1 * maticRate;
    var _mintprice = nftPrice * _mintamount;

    //call cost of the transaction
       contract.methods.cost().call().then(function(result){
         console.log(result)
        })

    var _mintprice2 = ethers.utils.parseEther(_mintprice.toString());
    var accounts=walletAddress;
    var web3=new Web3(window.ethereum);
    //get provider using web3
    var provider = new ethers.providers.Web3Provider(web3.currentProvider);
    //get gas price
    var gasPrice = await provider.getGasPrice();
    //convert gasPrice to wei
    var gasPriceWei = ethers.utils.parseEther(gasPrice.toString());
    

    contract.methods.mint(accounts,_mintamount)
    .send({
      from: accounts,
      value: _mintprice2,
      to: NFTCONTRACT,
      gasPrice: gasPriceWei,
      maxPriorityFeePerGas: gasPrice,
      maxFeePerGas: gasPrice,
      gasLimit: 750000,
    })

  }

  async function getRates(){
  const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
  const responseMatic = await fetch(maticPrice);
  const dataMatic = await responseMatic.json()
  console.log("Matic Price " + dataMatic.price); //data.price is the price of MATIC in USDT
  setMaticRate (1 / dataMatic.price)

  const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
  const responseBnb = await fetch(bnbPrice);
  const dataBnb = await responseBnb.json()
  console.log("BNB Price " + dataBnb.price); //data.price is the price of BNB in USDT
  setBnBRate(1 / dataBnb.price)

  const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
  const responseEth = await fetch(ethPrice);
  const dataEth = await responseEth.json()
  console.log("ETH Price " + dataEth.price); //data.price is the price of ETH in USDT
  setEthRate(1 / (dataEth.price)) //reduce gas price

  }



  
  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              {/* <Countdown style={{ maxWidth: "100%", margin: "top", maginLeft: "-50px", maginRight: "-50px" }}
                timeTillDate="08 30 2022, 6:00 am"
                timeFormat="MM DD YYYY, h:mm a" /> */}
              <div className="mint_img">
                <img src={mintImg} alt="f-nft mint" style={{ borderRadius: "15px", borderWidth: "5px", borderColor: "#ffffff", textAlign: "center", borderShadow: "#ffffff" }} />
                <h5 style={{ color: "red", textAlign: "center", textShadow: "#372873" }} onClick={reload}>Please Refesh if You Change The Network</h5> 
              </div>
              <Button onClick={() => mintModalHandle()} onClose={reload}>
                <FiX />
              </Button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                      8,282/<span>10,000</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price Total</h5>
                    {localStorage.getItem("ethRate") === null ?
                      <h5> ETH</h5> :
                      < h5 > {n * count} ETH</h5>}
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        onClick={() =>
                          count > 1 ? setCount(count - 1) : count
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        value={counts}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <h5>
                      <span>{MdPriceChange.counts}{count * usdRate}</span> USD
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={(e) => mint2(count)}>
                  Mint Now
                </Button>
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
      </MintModalStyleWrapper>
    </>
  );
};

export default MintNowModal;