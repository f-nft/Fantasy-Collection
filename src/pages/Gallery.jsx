import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import PageHeader from "../common/pageHeader";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import { useEffect, useState } from "react";
import axios from "axios";
import './Gallerystyle.css'
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles";
import { useCallback } from "react";
// import Whycrypto from '../components/GalleryComponents/Why_crypto'
import Features from "../components/GalleryComponents/Features";
import HoldandEarn from "../components/GalleryComponents/HoldandEarn";
import { Typewriter } from 'react-simple-typewriter'
import AOS from "aos";
import "aos/dist/aos.css";
import Mediacontainer from './../components/GalleryComponents/Media_container';
const Gallery = () => {
  const { isBanner, setisBanner, stateAddress, stateContract } = useModal();
  const [isAddress, SetisAddress] = useState(false);
  //create a state variable to store the data in array
  const [data, setData] = useState([]);
  const [nftdata, setNftdata] = useState([]);

  // const [discount, setDiscount] = useState(false);
  const pool = [
    {
      collection: "Discovery",
      Rewards: "30% APR",
      Exchange: "40% APY or 2 NFTs",
    },
    {
      collection: "Angel & Devil",
      Rewards: "40% APR",
      Exchange: "50% APY or 5 NFTs"
    },
    {
      collection: "Chaos",
      Rewards: "50% APR",
      Exchange: "60% APY or 15 NFTs"
    }

  ]

  // const options = {
  //   method: 'GET',
  //   url: 'https://api.nftport.xyz/v0/nfts/0x014e897defaf2adb41c117d853aafb8729b78b44',
  //   params: { chain: 'polygon', include: 'metadata' },
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: '0b4d39b3-8ce8-43b6-99f0-427226147a55'
  //   }
  // };


  const GETNFTS = async () => {
    const accountbalance = await stateContract.methods.balanceOf(stateAddress).call();
    for (let i = 0; i < accountbalance; i++) {
      const tokenid = await stateContract.methods.tokenOfOwnerByIndex(stateAddress, i).call();
      let tokenuri = await stateContract.methods.tokenURI(tokenid).call();
      let tokenuridata = await axios.get(tokenuri);
      let tokenuridata1 = tokenuridata.data;

      setNftdata(nftdata => [...nftdata, tokenuridata1]);
      // const discout="Fantasy #8"
      //iterate through the array and check if the name is equal to the discount name
      // if(nftdata[i].name==discout)
      // {
      //   console.log({"Discount NFT":nftdata[i].name}) 
      //   setDiscount(true);
      // }
      let tokenuridata2 = tokenuridata1.image;
      setData(data => [...data, tokenuridata2]);
      // console.log(tokenuridata.data.name);
      //displaying attributes of each nft
      // for(let i=0;i<tokenuridata.data.attributes.length;i++)
      //   {       
      //           let tokenuridata2=tokenuridata.data;
      //            console.log(tokenuridata2.attributes[i].value);
      //   }

    }
  }
  useEffect(() => {
    AOS.init(
      {
        duration: 500
      }
    );
    
  }, [isBanner]);
  
  useEffect(() => {
      setData([]);
      setisBanner(false)
    stateAddress ? SetisAddress(true) : SetisAddress(false)
    if (stateContract)
      GETNFTS()
      //eslint-disable-next-line
  }, [stateAddress, stateContract]);
  useEffect(() => {
     setisBanner(false)
     //eslint-disable-next-line
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);

  }, []);
  
  return (
    <>
      <div className="canvas" style={{ position: 'absolute' }} >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            // fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 160,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                "enable": true,
                "speed": 4,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 6 },
              },

            },
            detectRetina: true,

          }}
        />
      </div>
      <Layout>
        <GlobalStyles />
        <Header />
        <div style={{ position: "relative" }} >

          <PageHeader title="NFT" />
        </div>
        <div className='row px-4 mx-3 pt-2 mt-3'>
          <div className="toptable">
            <h1 className="heading">Fantasy NFT Staking Pool Active Rewards</h1>
            <h5 className="card-title" style={{ color: "green" }}>EARN FOT</h5>

            {isAddress ? <h1>NFTS FOUND</h1> : <h1>WALLET NOT CONNECTED</h1>}
            <div className="cardrow row mt-5 mb-5 mx-0" id="rewards">
              {pool.map((item, index) => {
                return (

                  <div key={index} data-aos="zoom-in-up" className="headingrow card" >
                    <div className="arrow"></div>
                    <div className="parent">
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{item.collection}</h2>
                      <h3 className="rewards">Rewards</h3>
                      <h4 className="card-text">{item.Rewards}</h4>
                      <h3 className="rewards">Quarterly</h3>
                      <h4 className="exchange">{item.Exchange}</h4>
                    </div>
                  </div>

                )
              }
              )}

            </div>
          </div>
          <div className='secondtable'>

            <h1 className="heading">
              <Typewriter
                words={['FOT Token Stake Farms']}
                loop={2}
                cursor
                cursorStyle='!'
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
              <thead className='thead-light' style={{ fontSize: '20px' }}>
                <tr>
                  <th scope='col'>Farm Pools</th>
                  <th scope='col'>Harvest Daily Earnings</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '18px' }}>
                <tr>
                  <td>Stake FOT to Earn FOT</td>
                  <td className='amount' data-test-id='rewards-summary-ads'>
                    <span className='amount'>From 40% APY Earn FOT</span>&nbsp;<span className='currency'>Per FOT Staked</span>
                  </td>
                </tr>
                <tr>
                  <td>Stake FOT to Earn FOT™</td>
                  <td className='amount' data-test-id='rewards-summary-ac'>
                    <span className='amount'>From 30% APY Earn FOT™</span>&nbsp;<span className='currency'>Per FOT Staked</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h5 style={{ color: "purple" }}>
              <Typewriter
                words={['FOT™ could be use for upgrade NFT or trade for secret FNFT item - FOT price is starting from $1.00']}
                cursor
                cursorStyle='_'
                typeSpeed={30}
                loop={2}
              />

            </h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {data.map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="nftcard mb-3" style={{ width: "18rem" }}>
                    <img src={item} alt="nft" className="img-fluid" />
                    <div className="card-body">
                      <p className="card-title">{nftdata[index].name}</p>
                    </div>
                    <button className="CardButton btn btn-primary">Stake this NFT</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <CTA />

        <div className="row" id="features">
          <div className="MediaContainer col-md-6">
            <Mediacontainer />
          </div>
          <div className="FeatureContainer col-md-6">
            <Features />
          </div>
        </div>

        <div className="HoldEearn" id="Hold">
          <HoldandEarn />
        </div>
        <Footer />
      </Layout>

    </>
  );
};

export default Gallery;