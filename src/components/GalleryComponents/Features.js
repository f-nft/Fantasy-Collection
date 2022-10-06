import React from "react";

import "./Styling.css";

export default function Features() {
  return (
    <section className="features">
      <h1 className="featurehead">Features</h1>
      <div className="banner-bottom-margin">
        <div className="banner--left">
          <div className="banner__title card--secondary card--white">
              <h2> Total Supply</h2>
            <h3>10 Millions</h3>
          </div>
          <p className="card__header">
            No future minting allowed in the contract. Tokens will be
            distributed to the community through giveaways,
            <br /> community interaction, and surprise airdrops and only reward
            by staking NFT.
          </p>
          <div className="road-body features-card">
            <div className="featurecard card--secondary card--white">
              <div className="card__header">
                <h3>Communities</h3>
              </div>
              <h2>30%</h2>
            </div>
            <div className="featurecard card--white card--white">
              <div className="card__header">
                <h3>Rewards</h3>
              </div>
              <h2>30%</h2>
            </div>
            <div className="featurecard card--white card--white">
              <div className="card__header">
                <h3>Teams</h3>
              </div>
              <h2>10%</h2>
            </div>
            <div className="featurecard card--white card--white">
              <div className="card__header">
                <h3>Liquidity Pool</h3>
              </div>
              <h2>30%</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}