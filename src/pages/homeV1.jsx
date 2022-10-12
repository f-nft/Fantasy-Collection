import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Header from "../components/section/header/v1/Header";
import Layout from "../common/layout";
// import Counter from "../components/section/counter";
import CharacterSlider from "../components/section/characterSlider/v1";
import HowToMint from "../components/section/howToMint/v2";
import About from "../components/section/about/v1";
import RoadMap from "../components/section/roadMap/v1";
import Team from "../components/section/team/v1";
import FAQ from "../components/section/faq/v3";
import Footer from "../components/section/footer/v3";
import Partner from "../components/section/partner";
import PriceModal from "../common/modal/priceModal/PriceModal";
import "aos/dist/aos.css";
import { useEffect } from "react";
const HomeV1 = () => {

  const {priceModalVisibiity,setisBanner,isBanner } = useModal();
  useEffect(() => {
    setisBanner(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBanner]);
 
  return (
    <>
    <Layout>
     
      <GlobalStyles />
      {/* {visibility && <MintNowModal />}  
      {walletModalvisibility && <WalletModal />} */}
      {priceModalVisibiity && <PriceModal />}
      <Header />
      <CharacterSlider />
      {/* <Counter /> */}
      <HowToMint />
      <About />
      <RoadMap />
      <Team />
      <FAQ />
      <Partner />
      <Footer />
    </Layout>
    </>
  );
};

export default HomeV1;
