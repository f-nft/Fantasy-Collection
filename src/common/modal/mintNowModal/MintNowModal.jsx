import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
// import { NFTCONTRACT } from './../../config/config';
import { BSCNFTCONTRACT } from "../../config/bscconfig";
import { ethers } from "ethers";
// import TOKENABI from './../../config/TOKENABI.json';

const MintNowModal = () => {

  const [count, setCount] = useState(1);
  const { mintModalHandle, stateAccount, statePrice, stateCrypto,
    stateContract, stateWeb3, stateAddress
  } = useModal();
  var address = stateAddress;
  var account = stateAccount;
  var price = statePrice;
  var crypto = stateCrypto;
  var contract = stateContract;
  var Web3Alc = stateWeb3;
  const reload = () => window.location.reload();
  var counts = count.toFixed(1);

  const expectedBlockTime = 10000;
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  // async function mint0(numberofNFTs) {
  //   try {
  //     var rate = stateRate;
  //     var account = walletAddress;
  //     var _mintAmount = numberofNFTs;
  //     // var mintRate = Number(await contract.methods.cost().call());
  //     var mintValue = rate * price;
  //     var totalAmount = mintValue * _mintAmount;
  //     //eslint-disable-next-line
  //     if (stateChainId == 0x1)
  //       totalAmount = price * _mintAmount;
  //     //convert totalAmount to wei
  //     //   var totalAmountWei = Web3Alc.utils.toWei(totalAmount.toString(), "ether");
  //     var _pid = "2";
  //     var erc20address = await contract.methods.getCryptotoken(_pid).call();
  //     var currency = new stateWeb3.eth.Contract(TOKENABI, erc20address);
  //     var mintRate = await contract.methods.getNFTCost(_pid).call();
  //     totalAmount = mintRate * _mintAmount;
  //     await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
  //       Web3Alc.eth.getBlock('pending').then((block) => {
  //         var baseFee = Number(block.gasLimit);
  //         var maxPriority = Number(tip);
  //         var maxFee = maxPriority + baseFee;
  //         currency.methods.approve(NFTCONTRACT, String(totalAmount))
  //           .send({
  //             from: account,
  //           })
  //           .then(currency.methods.transfer(NFTCONTRACT, String(totalAmount))
  //             .send({
  //               from: account,
  //               maxFeePerGas: maxFee,
  //               maxPriorityFeePerGas: maxPriority,
  //               gasPrice: baseFee,
  //               // gas: 10000000,
  //               gasLimit: "0x" + baseFee.toString(16)
  //             },
  //               async function (error, transactionHash) {
  //                 console.log("Transfer Submitted, Hash: ", transactionHash)
  //                 let transactionReceipt = null
  //                 while (transactionReceipt == null) {
  //                   transactionReceipt = await stateWeb3.eth.getTransactionReceipt(transactionHash);
  //                   await sleep(expectedBlockTime);
  //                 }
  //                 console.log("Transfer Complete", transactionReceipt);
  //                 contract.methods.mint(account, _mintAmount)
  //                   .send({
  //                     from: account,
  //                     maxFeePerGas: maxFee,
  //                     maxPriorityFeePerGas: maxPriority,
  //                     gasPrice: baseFee,
  //                     // gas: 10000000,
  //                     gasLimit: "0x" + baseFee.toString(16)
  //                   });

  //               }));
  //       });
  //     });
  //   }
  //   catch (error) {
  //     alert(error);
  //   }
  // }

  //Currently mint native is working for Polygon

  async function mint(numberofNFTs) {
    var rate = price * 1000000000000000;
    console.log("Matic Price ", rate);
    var mintRate = null;
    var totalAmount = null;
    var _mintAmount = Number(numberofNFTs);
    //eslint-disable-next-line
    if (stateCrypto == "Polygon", "Mumbai")
    //mint for Polygon / Mumbai
    {
      try {
        mintRate = Number(await contract.methods.cost().call());
        totalAmount = (_mintAmount * rate).toFixed(0);
        console.log("Total Price ", rate);

        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending').then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority
            contract.methods.mint(account, _mintAmount)
              .send({
                from: account,
                value: totalAmount,
                maxFeePerGas: maxFee,
                maxPriorityFeePerGas: maxPriority,
                gasPrice: baseFee
              });
          });
        })
        await sleep(expectedBlockTime);
      } catch (error) {
        console.log(error);
      }
    }

    //eslint-disable-next-line
    else if (stateCrypto == "Ethereum", "Rinkeby") {
      rate = price * 1000000000000000000;
      console.log("ETH Price ", rate);
      //mint for ethereum network
      try {
        mintRate = Number(await contract.methods.price().call());
        // mintRate = ethers.utils.formatUnits(mintRate, 'ether');
        console.log("ETH Contract Price ", mintRate);
        //need to get the price from the contract
        //currently it is hardcoded
        // mintRate = 50000000000000000;
        totalAmount = (_mintAmount * rate).toFixed(0);
        var total = ethers.utils.parseEther(totalAmount)
        console.log("Total Amount ", total);
        
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending').then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority
            contract.methods.mint(address, _mintAmount).send({
                from: address,
                baseFee: baseFee + maxPriority,
                gas: 300000,
                fee: _mintAmount * baseFee,
                maxPriorityFeePerGas: maxFee,
                value: totalAmount,
                to: contract
              });
          });
        })
        await sleep(expectedBlockTime);
      } catch (error) {
        console.log(error);
      }
    }

    //eslint-disable-next-line
    else if (stateCrypto == "Binance Chain") {
      rate = price;
      console.log("BNB Price ", rate);
      contract.methods.approve(BSCNFTCONTRACT, 1)
        .send({ from: account, gasLimit: 30000 })
      try {
        mintRate = await contract.methods.cost().call()
        totalAmount = (mintRate * _mintAmount * rate).toFixed(0);
        //convert totalAmount to decimal from power of 18
        totalAmount = totalAmount / 100000000000000000;
        Web3Alc.eth.getBlock('pending').then((block) => {
          console.log(block)
          contract.methods.mint(account, _mintAmount)
            .send({
              from: account,
              gas: 30000,
              value: totalAmount,
            }
            );
        });
        await sleep(expectedBlockTime);
      }
      catch (error) {
        console.log(error);
      }
    }
    else
      return alert("Minting is not supported for this network");
  }

  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              <div className="mint_img">
                <img src={mintImg} alt="f-nft mint" style={{ borderRadius: "15px", borderWidth: "5px", borderColor: "#ffffff", textAlign: "center", borderShadow: "#ffffff" }} />
                <h5 style={{ color: "red", textAlign: "center", textShadow: "#372873" }} onClick={reload}>Please Refesh if You Change The Network</h5>
                {{ crypto } ?
                  (<span>You Are Connected to {crypto} Network</span>) :
                  (<span></span>)}<br />
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
                    {(price) === null ?
                      <h5> ETH</h5> :
                      < h5 >{(price * count).toFixed(5)} {(crypto)}</h5>}
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
                      <button onClick={() => setCount(count + 1)}>
                        +
                      </button>
                    </div>
                    <h5>
                      <span>{MdPriceChange.counts}{count * localStorage.getItem("usdRate")}</span> USD
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={(e) => mint(count)}>
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

    //   await Web3Alc.eth.getMaxPriorityFeePerGas().then((tips) => {
    //     Web3Alc.eth.getBlock("pending").then((block) => {
    //       var baseFee = Number(block.gasLimit);
    //       var maxPriority = Number(tips);
    //       var maxFee = baseFee + maxPriority;
    //       console.log("Mint PID Function")

    //       // contract.methods.mint(account, _mintAmount)
    //       //   .send({
    //       //     from: account,
    //       //     value: totalAmountWei,
    //       //     gasPrice: baseFee,
    //       //     maxFeePerGas: maxFee,
    //       //     maxPriorityFeePerGas: maxPriority,
    //       //     gasLimit: "0x" + baseFee.toString(16)
    //       //   }).on("transactionHash", function (hash) {})
    //       //   .on("confirmation",function(confirmationNumber, receipt){})
    //       //   .then(function(data){
    //       //     console.log(data);
    //       //   })
    //       contract.methods.mintpid(NFTCONTRACT,numberofNFTs,1)
    //         .send({
    //           from: account,
    //           // value: totalAmountWei,
    //           //for testing purpose we have set value to 0
    //           value:0,
    //           gasPrice: baseFee,
    //           maxFeePerGas: maxFee,
    //           maxPriorityFeePerGas: maxPriority,
    //           gasLimit: "0x" + baseFee.toString(16)
    //         }).on("transactionHash", function (hash) {})
    //         .on("confirmation",function(confirmationNumber, receipt){})
    //         .then(function(data){
    //           console.log(data);
    //         })
    //     })
    //       .catch((err) => alert(err.message));
    //   })
    //     .catch((err) => alert(err.message));
