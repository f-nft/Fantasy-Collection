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
const Gallery = () => {
  const { isBanner, setisBanner, stateAddress, stateContract } = useModal();
  const [isAddress, SetisAddress] = useState(false);
  //create a state variable to store the data in array
  const [data, setData] = useState([]);

  const GETNFTS = async () => {
    const accountbalance = await stateContract.methods.balanceOf(stateAddress).call();
    for (let i = 0; i < accountbalance; i++) {
      const tokenid = await stateContract.methods.tokenOfOwnerByIndex(stateAddress, i).call();
      let tokenuri = await stateContract.methods.tokenURI(tokenid).call();
      let tokenuridata = await axios.get(tokenuri);
      let tokenuridata1 = tokenuridata.data;
      let tokenuridata2 = tokenuridata1.image;
      setData(data => [...data, tokenuridata2]);
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
  }, [stateAddress]);

  return (
    <>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader title="Gallery" />
        {isAddress ? <h1>NFTS FOUND</h1> : <h1>WALLET NOT CONNECTED</h1>}
        <div className="container">
          <div className="row">
            {data.map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="nftcard" style={{ width: "18rem" }}>
                    <img src={item} alt="nft" className="img-fluid" />
                    <button className="CardButton btn btn-primary">Stake this NFT</button>
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

export default Gallery;