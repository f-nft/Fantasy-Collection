import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import PageHeader from "../common/pageHeader";
import BlogList from "../components/section/blog/blogList/BlogList";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import WalletModal from "../common/modal/walletModal/WalletModal";
import { useEffect } from "react";
const Blogs = () => {
  const { walletModalvisibility,isBanner,setisBanner } = useModal();
  useEffect(() => {
    if(isBanner)
    setisBanner(false)
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout>
        <GlobalStyles />
        {walletModalvisibility && <WalletModal />}
        <Header />
        <PageHeader title="Latest Blog"/>
        <BlogList />
        <CTA />
        <Footer />
      </Layout>
    </>
  );
};

export default Blogs;
