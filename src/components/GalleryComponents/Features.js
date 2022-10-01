import React from "react";
import background6 from "./images/background-item-6.svg";
import background7 from "./images/background-item-7.svg";
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
          <h2>100 Millions</h2>
        </div>
        <div className="featurecard card--secondary card--white">
          <div className="card__header">
            <h3>Community</h3>
          </div>
          <h2>20%</h2>
        </div>
        <div className="featurecard card--white card--white">
          <div className="card__header">
            <h3>Team</h3>
          </div>
          <h2>10%</h2>
        </div>
        <div className="featurecard card--white card--white">
          <div className="card__header">
            <h3>Burn</h3>
          </div>
          <h2>40%</h2>
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
        <div className="banner-bottom-margin">
          <div className="banner--left">
            <h2 className="banner__title">Rewards for Community</h2>
            <p className="banner__text text text--small text--regular text--muted">
              FOT offers rewards for Community Creation. If you have a a piece of art, media, or anything FOT related send it to @ElonCatMoon Twitter for a chance at an airdrop.
            </p>
          </div>
        </div>
        <div className="banner-bottom-margin">
          <div className="banner--left">
            <h2 className="banner__title">
              Vote on FOT Governance
            </h2>
            <p className="banner__text text text--small text--regular text--muted">
              FOT will slowly transition into a DAO where all governance and changes will be voted on through the community using the 
              FOT token. 
            </p>
          </div>
        </div>
        <div className="grid_choose">
          <div className="banner--left">
            <h2 className="banner__title">
              Hold and Earn
            </h2>
            <p className="banner__text text text--small text--regular text--muted">
            Holding certain amounts of FOT during a Snapshot guarantees you airdrops of NFTs, Future Tokens, etc.
            </p>
          </div>
        </div>
        <img
          className="background-item-6"
          src={background6}
          alt="Background item 6"
        />

      </section>
    );
}
