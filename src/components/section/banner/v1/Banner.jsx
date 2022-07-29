import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import characterThumb from "../../../../assets/images/nft/Character1.png";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect } from "react";
import Countdown from "../../countdown/countDown";

const Banner = () => {
  const { mintModalHandle, priceModalHandle, walletModalHandle } = useModal();
  const { isWalletConnect,walletAddress,balance } = useModal();
  
  // clean local storage on page refresh

  useEffect(() => {

  }, []);

  return (
    <BannerV1Wrapper id="home">
      <div className="container" style={{ marginTop: "-200px" }}>
        <div className="row">
          <div className="col-lg-6">
            <div className="f-nft_v1_baner_left">
              <h2>f-nft Fantasy</h2> 
              <h2>👗 3D NFT</h2>      
              <h3>collections</h3>
              <h4 style={{ color: "#375730", textShadow: "1px 1px 3px"}}>
                <span className="count">
                  <Counter end={1325} duration={1790} />
                </span>{" "}
                / 10,000 Minted
              </h4>
              <h5 style={{ color: "green" }}>
                Your Wallet Address:<br />
                {walletAddress ?
                  (<span style={{ color: "white" }}>{walletAddress}</span>) :
                  (<span style={{ color: "white" }}>0x0</span>)}
              </h5>
              <div className="f-nft_v1_timer">
                <h5 className="text-uppercase" style={{ color: "red" }}>Public Mint End In</h5>
                <div className="timer timer_1">
                  <Countdown style={{ maxWidth: "30%" }}
                    timeTillDate="10 30 2022, 6:00 am"
                    timeFormat="MM DD YYYY, h:mm a" />
                </div>
              </div>
              <h5 style={{ color: "green" }}>
                Balance <br />
                {balance ?
                  (<span style={{ color: "white" }}>{balance}</span>) :
                  (<span style={{ color: "blue" }}>0.00</span>)}
              </h5>
              <div className="banner_buttons">
                 {isWalletConnect?(
                <Button lg variant="mint" onClick={() => mintModalHandle()}>
                    Mint NFT</Button>
                ) : (
                  <Button lg variant="mint" onClick={() => walletModalHandle()}
                >
                 Connect Wallet First</Button>
                 )}
               
                <Button className="NFTPricebutton" lg variant="outline" data-toggle="modal" data-target="#exampleModalCenter"
                onClick={() => priceModalHandle()}>
                  NFT Price
                </Button>
              </div>
              <div className="coin-info">
                <span>Max 10 NFTs per wallet. Price $60 + gas</span>
                <span>
                  MINT IS LIVE{" "}
                  <span className="highlighted">UNTIL 01 JULY 04:00H</span>
                </span>
                <span>Presale : SOLDOUT</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="f-nft_v1_baner_right">
              <div className="f-nft_v1_baner_right_img_sect">
                <div className="mint_live_circle_sect">
                  <div className="mint_live_circle">
                    <span>
                    </span>
                    <span className="mint_live_text rotated-style">
                      <img src={mintLiveText} alt="" />
                    </span>
                  </div>
                </div>
                <div className="f-nft_v1_baner_right_img_bg">
                  <img src={homeImageBG} alt="" />
                </div>
                <div className="f-nft_v1_baner_right_img">
                  <img src={characterThumb} alt="avater" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;