import { useModal } from "../../../../utils/ModalContext";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../../../../assets/images/nft/Fantasy0000-0068.gif";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Typewriter } from 'react-simple-typewriter'
import Flash from 'react-reveal/Flash';


const Banner = (props) => {
  const {  priceModalHandle,
 } = useModal();
  const [nftPriceMatic, setNftPriceMatic] = useState(null);
  const [nftPriceBnb, setNftPriceBnb] = useState(null);
  const [nftPriceEth, setNftPriceEth] = useState(null);
  const [usdRate, setUsdRate] = useState(null);

  const useScript = (url) => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, [url]);
  };

  useEffect(() => {
    async function getRates(usdRate, ethRate, bnbRate, maticRate) {
      const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
      const responseEth = await fetch(ethPrice)
      var ethData = await responseEth.json()
      console.log("ETH Price " + ethData.price); //data.price is the price of Eth in USDT
      ethRate = 1 / ethData.price;
      localStorage.setItem("ethRate", ethRate);

      usdRate = 66;
      setUsdRate(usdRate);
      localStorage.setItem("usdRate", usdRate);

      var nftPrice = usdRate * ethRate;
      var nftPriceEth = nftPrice.toFixed(5);
      setNftPriceEth(nftPriceEth);
      localStorage.setItem("nftPriceEth", nftPriceEth);

      const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
      const responseBnb = await fetch(bnbPrice)
      var bnbData = await responseBnb.json()
      console.log("BNB Price " + bnbData.price); //data.price is the price of Bnb in USDT
      bnbRate = 1 / bnbData.price;
      localStorage.setItem("bnbRate", bnbRate);

      var nftBnbPrice = usdRate * bnbRate;
      var nftPriceBnb = nftBnbPrice.toFixed(5);
      setNftPriceBnb(nftPriceBnb);
      localStorage.setItem("nftPriceBnb", nftPriceBnb);

      const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
      const responseMatic = await fetch(maticPrice)
      var maticData = await responseMatic.json()
      console.log("Matic Price " + maticData.price); //data.price is the price of MATIC in USDT
      maticRate = 1 / maticData.price;
      localStorage.setItem("maticRate", maticRate);

      var nftEthPrice = usdRate * maticRate;
      var nftPriceMatic = nftEthPrice.toFixed(5);
      setNftPriceMatic(nftPriceMatic);
      localStorage.setItem("nftPriceMatic", nftPriceMatic);

    };
    getRates();
  }, []);
  return (
    <>
      <BannerV1Wrapper id="home">
        <div className="container">
          <div className="livecoinwatch-widget-5" lcw-base="USD" lcw-color-tx="#999999" lcw-marquee-1="coins" lcw-marquee-2="movers" lcw-marquee-items="20" >
            {useScript("https://www.livecoinwatch.com/static/lcw-widget.js")}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="f-nft_v1_baner_left">
                <Fade>
                <h1 style={{ color: "red" }}>f-nft Fantasy</h1>
                </Fade>
                <Zoom delay={500}>
                <h2>👗 3D NFT</h2>
                </Zoom>
                <h4 style={{ color: "#992730", textShadow: "1px 1px 3px" }}>
                  <div className="f-nft_v1_timer" align="left">
                    <h4 className="text-uppercase" style={{ color: "red", fontSize: "16px" }}>
                       <Typewriter
                words={['  Public Mint is Now Ended']}
                loop={2}
                cursor
                cursorStyle='!'
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
              <br/>
              <Flash>
              'New events update at Official Social'
              </Flash>
              </h4>
                  </div>
                  {/* <Countdown timeTillDate="09 30 2022, 12:12" timeFormat="MM DD YYYY, h:mm" /> */}
                  {/* <span className="count" padding="5px" style={{ color: "pink" }}>
                    <Counter end={76}
                    // duration={1}
                    />
                  </span>{" "}
                  / 10,000 Minted */}
                </h4>
                {/* <h5 style={{ color: "green" }}>
                  Your Wallet Address:<br />
                  {stateAddress ?
                    (<span style={{ color: "orange" }}>{stateAddress}</span>) :
                    (<span style={{ color: "orange" }}>0x0</span>)}<br />
                  {stateCrypto ?
                    (<span>You Are Connected to <h5 style={{ color: "red" }}>{stateCrypto} </h5></span>) :
                    (<span></span>)}
                </h5>
                <h5 style={{ color: "green" }}>
                  Your Balance <br />
                  {balance ?
                    (<span style={{ color: "orange" }}>{balance}</span>) :
                    (<span style={{ color: "orange" }}>0.00</span>)}
                </h5> */}
                <div className="banner_buttons">
                  <Link to="/nfts"><Button lg variant="mint">
                    Fantasy NFT Collections</Button>
                  </Link>
                  {/* {isWalletConnect ? (
                    <Button lg variant="mint" onClick={() => mintModalHandle()}>
                      Mint NFT</Button>
                  ) : (
                    <Button lg variant="mint" onClick={props.data}
                    >
                      Mint NFT</Button>
                  )} */}
                  <Button className="NFTPricebutton" lg variant="outline" data-toggle="modal" data-target="#exampleModalCenter"
                    onClick={() => priceModalHandle()}>
                    NFT Price
                  </Button>
                </div>
                <div className="coin-info">
                  <span>
                    <h4>Mint Price ${usdRate} USD <br /></h4>
                    <Fade left>
                        <div>  {nftPriceEth} ETH + gas <br /></div> 
                    </Fade>
                    <Fade right>
                        <div>{nftPriceMatic} Matic + gas <br /></div>
                    </Fade>
                    <Fade left>
                        <div>{nftPriceBnb} BNB + gas<br /></div>
                    </Fade>  
                    <br />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="f-nft_v1_baner_right">
                <div className="f-nft_v1_baner_right_img_sect">
                  <div className="mint_live_circle_sect">
                    <div className="mint_live_circle">
                      <span className="mint_live_text rotated-style">
                        <img src={mintLiveText} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="f-nft_v1_baner_right_img_bg">
                    <img src={homeImageBG} alt="fantasy" />
                  </div>
                  <div className="f-nft_v1_baner_right_img">
                    <Zoom>
                    <img src={characterThumb} alt="avata" />
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BannerV1Wrapper>
    </>
  );
};

export default Banner;