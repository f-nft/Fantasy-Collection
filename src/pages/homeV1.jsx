import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Header from "../components/section/header/v1/Header";
import Layout from "../common/layout";
// import CharacterSlider from "../components/section/characterSlider/v1";
import HowToMint from "../components/section/howToMint/v2";
import About from "../components/section/about/v2";
import RoadMap from "../components/section/roadMap/v2";
import Team from "../components/section/team/v1"
import FAQ from "../components/section/faq/v3";
import Footer from "../components/section/footer/v3";
// import Partner from "../components/section/partner"
import PriceModal from "../common/modal/priceModal/PriceModal";
import EventModal from "../common/modal/eventModal/EventModal";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
const HomeV1 = () => {

  const {priceModalVisibiity,setisBanner,isBanner,eventhandler } = useModal();
//   useEffect(() => {
//     setisBanner(true);
//     Aos.init({ 
//       duration: 450,
//       once: true,
//    });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isBanner]);
 
  return (
    <>
    <Layout>

      <GlobalStyles />
      {eventhandler&&<EventModal />}
      {/*{walletModalvisibility && <WalletModal />} */}
      {priceModalVisibiity && <PriceModal />}
      <Header />
      {/* <CharacterSlider /> */}
      {/* <Counter /> */}
      <HowToMint />
      <About />
      <RoadMap />
      <Team />
      <FAQ />
      {/* <Partner /> */}
      <Footer />
    </Layout>
    </>
  );
};

export default HomeV1;
