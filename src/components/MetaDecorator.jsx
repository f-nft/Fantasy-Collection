import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import PreviewImage from './preview.png'


const metaDecorator = {
  "hostname": "https://nft.f-nft.us/",
  "twitterUsername": "@Fashion__NFT",
};

const MetaDecorator = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={PreviewImage} />
    <meta
      property="og:url"
      content={metaDecorator.hostname + window.location.pathname + window.location.search}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content="ImagePreview" />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;