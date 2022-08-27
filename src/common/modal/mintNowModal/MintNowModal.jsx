import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
import { BSCNFTCONTRACT } from "../../config/bscconfig";
import { ethers } from "ethers";

const MintNowModal = () => {

  const [count, setCount] = useState(1);
  const { mintModalHandle, stateAddress, statePrice, stateCrypto,
    stateContract, stateWeb3, stateCoin
  } = useModal();
  var account = stateAddress;
  var coin = stateCoin;
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

  //Currently mint native is working for Polygon

  async function mintnative(numberofNFTs) {
    var mintRate = price;
    var _mintAmount = Number(numberofNFTs);
    var totalAmount = mintRate * _mintAmount;
    // eslint-disable-next-line
    if (stateCrypto == "Polygon", "Mumbai")
    // mint for Polygon
    {
      console.log(stateCrypto)
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        var total = totalAmount * 0.9;
        // convert totalAmount to wei
        var totalAmountWei = Web3Alc.utils.toWei(total.toString(), "ether");
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending', true).then((block) => {
            var account = stateAddress;
            var fee = Number(block.baseFeePerGas);
            var baseFee = fee;
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority;
            console.log(maxFee)
            contract.methods.mint(address, _mintAmount)
              .send({
                from: account,
                gasLimit: 7920027,
                value: Number(totalAmountWei),
                maxPriorityFeePerGas: maxFee,
                gasPrice: baseFee
              });
          });
        })
      } catch (error) {
        console.log(error);
        await sleep(expectedBlockTime);
      }
    }
    //eslint-disable-next-line
    else if (stateCrypto == "Ethereum", "Rinkeby") {
      // mint for ethereum network
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        totalAmount = mintRate * _mintAmount;
        total = totalAmount * 0.9;
        await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
          Web3Alc.eth.getBlock('pending', true).then((block) => {
            var account = stateAddress;
            var baseFee = Number(block.baseFee);
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority;
            contract.methods.mint(address, _mintAmount)
              .send({
                from: account,
                gasLimit: 30000,
                value: total,
                gasPrice: baseFee,
                maxPriorityFeePerGas: maxFee
              });
          });
        })
      } catch (error) {
        console.log(error);
        await sleep(expectedBlockTime);
      }
    }
    //eslint-disable-next-line
    else if (stateCrypto == "Binance Chain") {
      contract.methods.approve(BSCNFTCONTRACT, 1)
        .send({ from: account, gasLimit: 30000 })

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        Web3Alc.eth.getBlock('pending', true).then((block) => {
          console.log(block)
          contract.methods.mint(address, _mintAmount)
            .send({
              from: account,
              gasLimit: 30000,
              value: totalAmount,
            }
            );
        });
      }
      catch (error) {
        console.log(error);
      }
      await sleep(expectedBlockTime);
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
                      <h5> ETH </h5> :
                      < h5 >{(price * count).toFixed(4)} {(coin)}</h5>}
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