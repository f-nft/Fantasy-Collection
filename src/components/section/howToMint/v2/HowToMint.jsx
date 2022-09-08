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
        <div className="contract">
          <h4><p>BSC Smart Contract: https://bscscan.com/token/0xeB63891bdEE6894E5eA3c6BCa8D197CC81d76Bf0</p>
            <p>Ethereum Smart Contract: https://etherscan.io/address/0xc1f32ee1634c4a3d217920122216aedbd1014f08</p>
            <p>Polygon Smart Contract: https://polygonscan.com/token/0x014e897defaf2adb41c117d853aafb8729b78b44</p>
          </h4>
        </div>
        <div className="how_to_mint_content">
          <ul>
            {data?.map((item, i) => (
              <li key={i}>
                <h4 className={item.mintColor}>{item.num}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HowToMintWrapper>
  );
};

export default HowToMint;
