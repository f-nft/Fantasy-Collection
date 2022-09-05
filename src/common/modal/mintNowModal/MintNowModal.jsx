import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
// import { NFTCONTRACT } from './../../config/config';
// import TOKENABI from './../../config/TOKENABI.json';
import {  ethers } from "ethers";

const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const { mintModalHandle, stateAddress, statePrice, stateCrypto,
    stateContract, stateWeb3, stateCoin
  } = useModal();
  var account = stateAddress;
  var coin = stateCoin;
  var price = statePrice * 0.9;
  var contract = stateContract;
  var Web3Alc = stateWeb3;
  const reload = () => window.location.reload();
  var counts = count.toFixed(1);


  async function mintnative(numberofNFTs) {

    console.log(stateCrypto)
    var mintRate = null;
    var totalAmount = null;
    var _mintAmount = Number(numberofNFTs);
    //eslint-disable-next-line
    if (stateCrypto == "Polygon")
    //mint for Polygon
    {
      try {
        //set mintRate to 65 MATIC
        mintRate = price;
        console.log(mintRate);
        totalAmount = mintRate * _mintAmount;
        //convert totalAmount to wei
        var totalAmountWei = Web3Alc.utils.toWei(totalAmount.toString(), "ether");
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending').then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority;
            contract.methods.mint(account, _mintAmount)
              .send({
                from: account,
                to: contract,
                value: Number(totalAmountWei),
                maxFeePerGas: maxPriority,
                maxPriorityFeePerGas: maxFee,
                gasPrice: baseFee
              });
          });
        })

      } catch (error) {
        console.log(error);

      }
    }
    //eslint-disable-next-line
    else if (stateCrypto == "Rinkeby") {
      //mint for rinkeby network
      console.log("minting for rinkeby")

      try {
         mintRate = price;
        totalAmount = mintRate * _mintAmount;
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending').then((block) => {
            var totalAmountWei = Web3Alc.utils.toWei(totalAmount.toString(), "ether");
            contract.methods.mint(account, _mintAmount)
              .send({
                from: account,
                value: totalAmountWei,
                gas:210000,
                maxPriorityFeePerGas:2000000000,
                maxFeePerGas:2000000000,
              });
          });
        })

      } catch (error) {
        console.log(error);

      }
    }
      
    // eslint-disable-next-line  
    else if (stateCrypto == "Ethereum") {
      //mint for ethereum network
      console.log("minting for ethereum")

      try {
         mintRate = price;
        totalAmount = mintRate * _mintAmount;
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending').then((block) => {
            var totalAmountWei = Web3Alc.utils.toWei(totalAmount.toString(), "ether");
            contract.methods.mint(account, _mintAmount)
              .send({
                from: account,
                value: totalAmountWei,
                gas:210000,
                maxPriorityFeePerGas:2000000000,
                maxFeePerGas:2000000000,
              });
          });
        })

      } catch (error) {
        console.log(error);

      }
    }
      
    //eslint-disable-next-line
    else if (stateCrypto == "Binance Chain") {
              try {
          mintRate = price
          totalAmount = mintRate * _mintAmount;
          //convert totalAmount to BigNumber
          totalAmount = ethers.utils.parseUnits(totalAmount.toString(), 18)
          console.log(totalAmount)
          await contract.methods.mint(account, _mintAmount)
              .send({
                from: account,
                gas: 300000,
                value: totalAmount,
  
              }
              );
        }
      catch (error) {
        console.log(error);
      }
    }
      
    //eslint-disable-next-line
    else if (stateCrypto == "Binance Chain Testnet") {

      try {
        mintRate = price
        totalAmount = mintRate * _mintAmount;
        //convert totalAmount to BigNumber
        totalAmount = ethers.utils.parseUnits(totalAmount.toString(), 18)
        console.log(totalAmount)
        await contract.methods.mint(account, _mintAmount)
            .send({
              from: account,
              gas: 300000,
              value: totalAmount,

            }
            );
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
                {{ coin } ?
                  (<span>You Are Connected to {coin} Network</span>) :
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
                      < h5 >{(price * count).toFixed(5)} {(coin)}</h5>}
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
                <Button lg variant="mint" onClick={(e) => mintnative(count)}>
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
