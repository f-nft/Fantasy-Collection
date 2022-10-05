import { useState } from "react";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import Button from "../../../../common/button";
import logo from "../../../../assets/images/logo.png";
import openseaIcon from "../../../../assets/images/icon/opensea.svg";
import { Link} from "react-router-dom";

import MobileMenuStyleWrapper from "./MobileMenu.style";


const MobileMenu = (props, mobileMenuhandle) => {
  mobileMenuhandle = props.mobileMenuhandle;
  const [isSubmenu, setSubmenu] = useState(false);

  const handleSubmenu = () => {
    setSubmenu(!isSubmenu);
  };
  return (
    <MobileMenuStyleWrapper className="f-nft_mobile_menu">
      <div className="f-nft_mobile_menu_content">
        <div className="mobile_menu_logo">
          <div className="logoimage">
              <img className="f-nft__logo" src={logo} alt="f-nft logo" />
          </div>
          <div className="closebutton">
              <button
                className="mobile_menu_close_btn"
                onClick={() => mobileMenuhandle()}
              >
                {" "}
                <BsXLg />
                {" "}
              </button>
          </div>
        </div>
        <div className="f-nft_mobile_menu_list">
          <ul>
            <li className="mobile_menu_hide">
              <a href="#home">Home</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#about">About</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#roadmap">Roadmap</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#team">Team</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#faq">FAQ</a>
            </li>
             <li>
                  <Link to="/nfts">NFT</Link>
              </li>
            <li className="submenu mobile_submenu" onClick={handleSubmenu}>
              <a href="# ">Blog +</a>
              <ul
                className={`sub_menu_list mobile_sub_menu_list ${
                  isSubmenu === true && "submenu_hovered"
                }`}
              >
                {/* <li className="mobile_menu_hide">
                  <a href="/">Home One</a>
                </li> */}
                {/* <li className="mobile_menu_hide">
                  <a href="/home-two">Home Two</a>
                </li>
                <li className="mobile_menu_hide">
                  <a href="/home-three">Home Three</a>
                </li> */}
                <li className="mobile_menu_hide">
                  <a href="/blogs">Latest Blog</a>
                </li>
                <li className="mobile_menu_hide">
                  <a href="/post">Blog Details</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mobile_menu_social_links">
          <a href="https://opensea.io/collection/fantasy-collection">
            <img src={openseaIcon} alt="f-nft social icon" />
          </a>
          <a href="https://twitter.com/Fashion__NFT">
            <FaTwitter />
          </a>
          <a href="https://discord.gg/58KS9smeCV">
            <FaDiscord />
          </a>
        </div>
        <Button
          sm
          variant="hovered"
          className="connect_btn"
          onClick={props.data}
        >
          <FaWallet /> Connect
        </Button>
      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
