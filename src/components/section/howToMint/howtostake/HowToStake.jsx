import SectionTitle from "../../../../common/sectionTitle";
import data from "../../../../assets/data/howToStake";
import polygonlogo from '../logo/logo.svg'
import logoetherscan from '../logo/logoetherscan.svg'
import logobscscan from '../logo/logobscscan.svg'
import HowToMintWrapper from "./HowToStake";

const HowToStake = () => {
  return (
    <HowToMintWrapper>
      <div className="container how_to_mint_container">
        <SectionTitle
          classNameName="md-pb-20"
          title="HOW TO MINT"
          subtitle="EASY STEPS"
        />
        <div className="how_to_mint_content">
          <ul>
            {data?.map((item, i) => (
              <li key={i}>
                <h4 className={item.mintColor}>{item.num}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
           <SectionTitle
          classNameName="md-pb-20"
          title="F-NFT FANTASY SMART CONTRACTS"
          subtitle="KEEP TRACK OF YOUR TRANSACTIONS"
        />
          <div className="contract" align="center">
            <button className ="logoButton" onClick={() => {
              window.open("https://bscscan.com/token/0xeB63891bdEE6894E5eA3c6BCa8D197CC81d76Bf0", "_blank");
            }}> <img src={logobscscan} alt="Polygon Logo"/>
            </button>
            <button className ="logoButton" onClick={() => {
              window.open("https://etherscan.io/address/0xc1f32ee1634c4a3d217920122216aedbd1014f08", "_blank");
              }}><img src={logoetherscan} alt="Etherscan logo" /></button>
              <button className ="logoButton" id="pbtn" onClick={() => {
              window.open("https://polygonscan.com/token/0x014e897defaf2adb41c117d853aafb8729b78b44", "_blank");
            }}><img src={polygonlogo} alt="Polygon Logo"/></button>
 
        </div>
        </div>
      </div>
    </HowToMintWrapper>
  );
};

export default HowToStake;
