import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";
import CountdownTimer from "react-component-countdown-timer";

import characterThumb from "../../../../assets/images/nft/Character1.png";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect } from "react";

const Banner = () => {
  const { mintModalHandle } = useModal();
  //clean local storage on page refresh
  const settings = {
    count: 5432560,
    showTitle: true,
    labelSize: 14,
    backgroundColor: "transparent",
    color: "#ffffff",
    dayTitle: "",
    hourTitle: "",
    minuteTitle: "",
    secondTitle: "",
    id: "countdownwrap",
  };

  useEffect(() => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("balance");
  }, []);
  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="f-nft_v1_baner_left">
              <h2>f-nft Fantasy 👗 NFT collections</h2>
              <div className="f-nft_v2_timer">
                <h4>TIME LEFT</h4>
                <div className="timer timer_1">
                  <CountdownTimer {...settings} />
                </div>
              </div>
              <h3>
                <span className="count">
                  <Counter end={55} duration={10000} />
                </span>{" "}
                / 10,000 Minted
              </h3>
              <h5>
                Your Wallet Address:<br />
                {localStorage.getItem("walletAddress") ?
                  (<span style={{ color: "white" }}>{localStorage.getItem("walletAddress")}</span>) :
                  (<span style={{ color: "white" }}>0x0</span>)}
              </h5>
              <div className="f-nft_v3_timer">
                <h5 className="text-uppercase">Public Mint end in</h5>
                <div className="timer timer_1">
                  <CountdownTimer {...settings} />
                </div>
              </div>
              <h5>
                Balance <br />
                {localStorage.getItem("balance") ?
                  (<span style={{ color: "white" }}>{localStorage.getItem("balance")}</span>) :
                  (<span style={{ color: "white" }}>0.00</span>)}
              </h5>
              <div className="banner_buttons">
                <Button lg variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button lg variant="outline">
                  Wishlist now
                </Button>
              </div>
              <div className="coin-info">
                <span>Max 10 NFTs per wallet . Price 0.06 ETH + gas</span>
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
