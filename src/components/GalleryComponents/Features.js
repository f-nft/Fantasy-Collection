import React from "react";

import './Styling.css'

export default function Features() {
   return (
      <section className="features">
        <h1 className="featurehead">
          Token Features
        </h1>
        <div className="banner-bottom-margin">
          <div className="banner--left">
            <h2 className="banner__title">Token Supply</h2>
            <p className="banner__text text text--small text--regular text--muted">
              No future minting allowed in the contract. Tokens will be distributed to the community through giveaways,<br/> community interaction, and surprise airdrops.
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
            <h3>Community</h3>
          </div>
          <h2>30%</h2>
        </div>
        <div className="featurecard card--white card--white">
          <div className="card__header">
            <h3>Team</h3>
          </div>
          <h2>10%</h2>
        </div>
        <div className="featurecard card--white card--white">
          <div className="card__header">
            <h3>Reward</h3>
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
