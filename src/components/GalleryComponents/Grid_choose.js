import React from "react";
import "./Styling.css";

export default function Grid_choose() {
  return (
    <div className="grid_choose">
      <div className="card_why">
        <div className="banner_grid">
          <h1 className="featurehead">Why you should buy FOT Token</h1>
          <p className="banner__text text text--small text--regular text--muted why-text">
            Experience the next generation cryptocurrency Token. A community
            project that will transition into a Decentralized Autonomous
            Organization (DAO) using the FOT Token for governance. No other
            Token rewards so aggressively for holding the Token. FOT is a Fair
            Launch token with no future minting allowed. Join us to the Moon!
          </p>
          <div className="ListDiv">
            <ul className="whyList">
              <li className="nav__list__item_2 text text--small text--regular">
                Strong Dev Team with history in Start Ups
              </li>
              <li className="nav__list__item_2 text text--small text--regular">
                Holding certain amounts of FOT during a Snapshot guarantees you
                airdrops of NFTs, Future Tokens, etc.
              </li>
              <li className="nav__list__item_2 text text--small text--regular">
                Set Supply with no Future Minting
              </li>
              <li className="nav__list__item_2 text text--small text--regular">
                Strong Community with Tokens Granting Voting Powers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
