import SectionTitle from "../../../../common/sectionTitle";
import data from "../../../../assets/data/howToMint";

import HowToMintWrapper from "./HowToMint.style";

const HowToMint = () => {
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
          <div className="contract" align="center" maxWidth="30%">
              <h2>Official Contract</h2>
            <img src="https://bscscan.com/images/logo-bscscan.svg?v=0.0.3" alt="bscscan" style={{borderRadius: "15px", padding: "3px"}} onClick={() => {
              window.open("https://bscscan.com/token/0xeB63891bdEE6894E5eA3c6BCa8D197CC81d76Bf0", "_blank");
            }} />
              {/* BSC Smart Contract 0xeB63891bdEE6894E5eA3c6BCa8D197CC81d76Bf0 </img></p> */}
              <img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2" alt="etherscan" style={{borderRadius: "5px", padding: "3px"}} onClick={() => {
              window.open("https://etherscan.io/address/0xc1f32ee1634c4a3d217920122216aedbd1014f08", "_blank");
              }} />
                {/* ETHEREUM Smart Contract 0xc1f32ee1634c4a3d217920122216aedbd1014f08 </button></p> */}
              <img src="https://polygonscan.com/images/logo.svg?v=0.0.3" alt="polygonscan" style={{borderRadius: "5px", padding: "2px"}} onClick={() => {
              window.open("https://polygonscan.com/token/0x014e897defaf2adb41c117d853aafb8729b78b44", "_blank");
            }}/>
              {/* POLYGON Smart Contract 0x014e897defaf2adb41c117d853aafb8729b78b44 </button></p> */}
        </div>
        </div>
      </div>
    </HowToMintWrapper>
  );
};

export default HowToMint;
