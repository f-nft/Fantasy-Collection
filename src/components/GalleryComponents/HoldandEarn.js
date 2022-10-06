import React from "react";
import AboutInfoCardListWrapper from "../section/about/aboutInfoCardList/AboutInfoCardList.style";
import AboutCard from "../section/about/aboutInfoCardList/aboutCard/AboutCard";
import aboutCardIcon1 from "../../assets/images/icon/star_3.svg";
export default function HoldandEarn() {
  const data = {
    aboutInfo: [
      {
        icon: aboutCardIcon1,
        title: "Rewards for Community",
        text: "FOT offers rewards for Community. If you have a a piece of art, media, or anything FOT related send it to Twitter for a chance at an airdrop.",
      },
      {
        icon: aboutCardIcon1,
        title: "Vote on FOT Governance",
        text: " FOT will slowly transition into a DAO where all governance and changes will be voted on through the community using the FOT token. ",
      },
      {
        icon: aboutCardIcon1,
        title: "Hold and Earn",
        text: " Holding certain amounts of FOT during a Snapshot guarantees you airdrops of NFTs, Future Tokens and more exicting prizes ,etc . ",
      },
    ],
  };
  const { aboutInfo } = data;
  return (
    <AboutInfoCardListWrapper className="about_us_text_card_sect">
      <div className="row">
        {aboutInfo?.map((item, i) => (
          <div key={i} className="col-md-4">
            <AboutCard {...item} />
          </div>
        ))}
      </div>
    </AboutInfoCardListWrapper>
  );
}

//     <>
//     <div className="HoldandEarn" style={{paddingTop:"2rem"}}>
//          <div className="banner-bottom-margin" >
//           <div className="banner--left" style={{position:"relative"}}>
//             <h2 className="banner__title">Rewards for Community</h2>
//             <p className="banner__text text text--small text--regular text--muted">
//               FOT offers rewards for Community Creation. If you have a a piece of art, media, or anything FOT related send it to @ElonCatMoon Twitter for a chance at an airdrop.
//             </p>
//           </div>
//         </div>
//         <div className="banner-bottom-margin">
//           <div className="banner--left">
//             <h2 className="banner__title">
//               Vote on FOT Governance
//             </h2>
//             <p className="banner__text text text--small text--regular text--muted">
//               FOT will slowly transition into a DAO where all governance and changes will be voted on through the community using the
//               FOT token.
//             </p>
//           </div>
//         </div>
//         <div className="grid_choose">
//           <div className="banner--left">
//             <h2 className="banner__title">
//               Hold and Earn
//             </h2>
//             <p className="banner__text text text--small text--regular text--muted">
//             Holding certain amounts of FOT during a Snapshot guarantees you airdrops of NFTs, Future Tokens, etc.
//             </p>
//           </div>
//         </div>
//         </div>
//         <div>
//         <img
//           className="background-item-6"
//           src={background6}
//           alt="Background item 6"
//         />
//     </div>
// </>
