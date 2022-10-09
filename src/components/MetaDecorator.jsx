import React from 'react';
import MetaTags from 'react-meta-tags';
import logoImage from '../assets/images/logo.png';


function MetaDecorator() {
  return (
    <MetaTags>
        <title>React App</title>
        <meta name="description" content="React App" />
        <meta property="og:title" content="React App" />
        <meta property="og:image" content={logoImage} />
    </MetaTags>
  )
}

export default MetaDecorator