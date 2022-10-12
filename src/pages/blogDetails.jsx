import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import PageHeader from "../common/pageHeader";
import BlogDetails from "../components/section/blog/blogDetails/BlogDetails";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import ShareModal from "../common/modal/shareModal/ShareModal";
import WalletModal from "../common/modal/walletModal/WalletModal";
import PriceModal from "../common/modal/priceModal/PriceModal";
import { useEffect } from "react";
import MetaDecorator from "../components/MetaDecorator";

const Blogs = () => {
  const { shareModalVisibility, walletModalvisibility,priceModalVisibiity,isBanner,setisBanner } = useModal();
  
  useEffect(() => {
    if(isBanner)
    setisBanner(false)
    //eslint-disable-next-line
  }, []);
  return (
    <>
  <MetaDecorator
        title="Fashion NFT"
        description="Fashion NFT is a collection of 10,000 unique NFTs that are generated and stored on the Ethereum blockchain. Each NFT is a unique digital representation of a fashion character."
      />
      <Layout>
        <GlobalStyles />
        {shareModalVisibility && <ShareModal />}
        {walletModalvisibility && <WalletModal />}
        {priceModalVisibiity&&<PriceModal />}
        <Header />
        <PageHeader title="Blog Details"/>
        <BlogDetails />
        <CTA />
        <Footer />
      </Layout>
    </>
  );
};

export default Blogs;
