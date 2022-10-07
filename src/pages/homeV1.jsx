import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Header from "../components/section/header/v1/Header";
import Layout from "../common/layout";
import Counter from "../components/section/counter";
import CharacterSlider from "../components/section/characterSlider/v1";
import HowToMint from "../components/section/howToMint/v2";
import About from "../components/section/about/v1";
import RoadMap from "../components/section/roadMap/v1";
import Team from "../components/section/team/v1";
import FAQ from "../components/section/faq/v3";
import Footer from "../components/section/footer/v3";
import MintNowModal from "../common/modal/mintNowModal";
import WalletModal from "../common/modal/walletModal/WalletModal";
import Partner from "../components/section/partner";
import PriceModal from "../common/modal/priceModal/PriceModal";
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
const HomeV1 = () => {

  const { visibility, walletModalvisibility, priceModalVisibiity, isBanner, setisBanner } = useModal();
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //   });
  //   if (!isBanner)
  //     setisBanner(true)
  //   //eslint-disable-next-line
  // }, []);
  return (
    <Layout>
      <GlobalStyles />
      {/* {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />} */}
      {priceModalVisibiity && <PriceModal />}
      <Header />
      <CharacterSlider />
      <Counter />
      {/* <HowToMint /> */}
      <About />
      <RoadMap />
      <Team />
      <FAQ />
      <Partner />
      <Footer />
    </Layout>
  );
};

export default HomeV1;
