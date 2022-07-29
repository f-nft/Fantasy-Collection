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
import Web3 from "web3";
// import { Contract, Signer, BigNumber, providers, utils } from 'ethers';
import { NFTCONTRACT } from '../../config/config';
import ABI from '../../config/ABI.json';
import { ethers } from 'ethers';

// import { ETHNFTCONTRACT } from '../../config/ethconfig';
// import { BSCNFTCONTRACT } from '../../config/bscconfig';
// import { STAKINGCONTRACT } from "../../config/config";

const MintNowModal = () => {
    const [count, setCount] = useState(1);
    const { mintModalHandle, walletAddress,
      stateContract
    } = useModal();
    const reload = () => window.location.reload();
    const [maticRate, setMaticRate] = useState(0);
    //eslint-disable-next-line
    const [bnbRate, setBnBRate] = useState(0);
    //eslint-disable-next-line
    const [ethRate, setEthRate] = useState(0);

    var counts = count.toFixed(1);

    useEffect(() => {
      async function getData() {
        const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
        const responseEth = await fetch(ethPrice)
        var dataEth = await responseEth.json()
        console.log("ETH Price " + dataEth.price); //data.price is the price of MATIC in USDT
        setEthRate(1 / dataEth.price);

        const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
        const responseMatic = await fetch(maticPrice);
        const dataMatic = await responseMatic.json()
        console.log("Matic Price " + dataMatic.price); //data.price is the price of MATIC in USDT
        setMaticRate(1 / dataMatic.price)

        const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
        const responseBnb = await fetch(bnbPrice);
        const dataBnb = await responseBnb.json()
        console.log("BNB Price " + dataBnb.price); //data.price is the price of BNB in USDT
        setBnBRate(1 / dataBnb.price)
      }
      getData()
    }, []);

    const ethNewRate = ethRate * 60;
    const usdRate = 60;
    var num = ethNewRate;
    var n = num.toFixed(5)
    console.log(ethNewRate);
    //reduce gas price


    async function mint(numberofNFTs) {
      if (window.ethereum) {
        var contract = stateContract;
        var _mintAmount = numberofNFTs;
        var nftPrice = 0.1 * maticRate;
        var _mintprice = nftPrice * _mintAmount;

        //call cost of the transaction
        var price = await contract.methods.cost().call();
        var totalPrice = _mintprice * price
        var total = String(totalPrice);
        var account = walletAddress;
        var web3 = new Web3(window.ethereum);
        console.log(web3)

        contract = new Web3.eth.Contract(ABI, NFTCONTRACT);

        // get provider using web3
        var provider = await new ethers.providers.Web3Provider(web3);
        // get gas price
        var gasPrice = new provider.getGasPrice();

        await new Web3.eth.getBlock('pending').then((block) => {
          //convert gasPrice to wei
          var baseFee = Number(block.baseFeePerGas);
          var maxPriority = 99999;
          var maxFee = baseFee + maxPriority;
          contract.methods.mint(account, _mintAmount).estimateGas({
            from: account,
            to: NFTCONTRACT,
            gasFee: gasPrice,
          }).then((estimateGas) => ({
            gasPrice: estimateGas.gasPrice,
          }).send({
            from: account,
            to: contract,
            value: Number(total),
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriority
          })
          )
        })
      }
      console.log()
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
                        <input type="text" id="quantity" value={counts}
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