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
import HowToStake from "../components/section/howToMint/howtostake/HowToStake";
import Stake from "../common/nftsdata/stakeInfo.jsx";

const Nft = () => {
  const { isBanner, setisBanner, stateAddress, stateContract } = useModal();
  const [isAddress, SetisAddress] = useState(false);
  //create a state variable to store the data in array
  const [data, setData] = useState([]);
  const [nftdata, setNftdata] = useState([]);
  //create a boolean variable to check if the data is loaded or not
  const [discount, setDiscount] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://api.nftport.xyz/v0/nfts/0x014e897defaf2adb41c117d853aafb8729b78b44',
    params: { chain: 'polygon', include: 'metadata' },
    headers: {
      'Content-Type': 'application/json',
      Authorization: '0b4d39b3-8ce8-43b6-99f0-427226147a55'
    }
  };

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
      for (let i = 0; i < tokenuridata.data.attributes.length; i++) {
        let tokenuridata2 = tokenuridata.data;
        // console.log(tokenuridata2.attributes[i].value);
      }

    }
  }

  useEffect(() => {
    setData([]);
    if (isBanner)
      setisBanner(false)
    stateAddress ? SetisAddress(true) : SetisAddress(false)
    if (stateContract)
      GETNFTS()
    //eslint-disable-next-line
  }, [stateAddress, stateContract]);

  return (
    <>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader title="NFT" />
        {isAddress ? <h1></h1> : <h1>WALLET NOT CONNECTED</h1>}
        {/* {discount?<h1>DISCOUNT NFT FOUND</h1>:<h1>NO DISCOUNT AVAILABLE</h1>} */}
        <div className="container">
          <div className="row">
            {data.map((item, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <HowToStake />
                  <Stake />
                  <div className="nftcard" style={{ width: "20rem" }}>
                    <img src={item} alt="nft" className="img-fluid" />
                    <div className="card-body">
                      <p className="card-title">{nftdata[index].name}</p>
                    </div>
                    <button className="CardButton btn btn-primary">Stake NFT</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <CTA />
        <Footer />
      </Layout>
    </>
  );
};

export default Nft;