import React from "react";

import './Styling.css'

export default function Features() {
   return (
      <section className="features">
        <h1 className="featurehead">
          Features
        </h1>
        <div className="banner-bottom-margin">
          <div className="banner--left">
            <h2 className="banner__title">Supply</h2>
            <p className="card__header">
              No future minting allowed in the contract. Tokens will be distributed to the community through giveaways,<br/> community interaction, and surprise airdrops and only reward by staking NFT.
            </p>
            <div className="road-body features-card">
            <div className="featurecard card--secondary card--white">
          <div className="card__header">
            <h3> Total Supply </h3>
          </div>
          <h2>10 Millions</h2>
        </div>
        <div className="featurecard card--secondary card--white">
          <div className="card__header">
            <h3>Communities</h3>
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
            <h3>Rewards</h3>
          </div>
          <h2>30%</h2>
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
