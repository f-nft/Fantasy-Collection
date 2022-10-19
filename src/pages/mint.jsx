import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
// import PageHeader from "../common/pageHeader";
// import BlogList from "../components/section/blog/blogList/BlogList";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import WalletModal from "../common/modal/walletModal/WalletModal";
import MintnowModal from "../common/modal/mintNowModal/MintNowModal";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Ethermodel from '../components/Ethermodel'
import './MintStyle.css'

const Mint = () => {
  
    const { walletModalvisibility,visibility } = useModal();   
    return (
        <>
            <Layout>
                <GlobalStyles />
                {walletModalvisibility && <WalletModal />}
                {visibility && <MintnowModal />}
                {/* <PageHeader />   */}
                <Header />
                {/* <App /> */}
                <CTA />
                <div className="contracts" style={{display:"flex"}}>
                    <div style={{height:"25em",width:"25em"}}>

                    <Canvas camera={{ position: [0, 0,75], fov: 50 }} >
                    
                        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={14}/>
                    
                        <ambientLight intensity={0.2} /> 
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Ethermodel scale={[0.045,0.06,0.05]} position={[0,0,0]} custom="Ethereum Contract" />
            
                    </Canvas>
                    </div>
                    <div style={{height:"25em",width:"25em"}}>

                    <Canvas camera={{ position: [0, 0,75], fov: 50 }} >
                    
                        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={14}/>
                    
                        <ambientLight intensity={0.2} /> 
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Ethermodel scale={[0.045,0.06,0.05]} position={[0,0,0]}  custom="Matic Contract" />
            
                    </Canvas>
                    </div>
                    <div style={{height:"25em",width:"25em"}}>

                    <Canvas camera={{ position: [0, 0,75], fov: 50 }} >
                    
                        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={14}/>
                    
                        <ambientLight intensity={0.2} /> 
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Ethermodel scale={[0.045,0.06,0.05]} position={[0,0,0]}  custom="BnB Contract"/>
            
                    </Canvas>
                    </div>
                </div>
                <Footer />
                
            </Layout>
        </>
    );
};
export default Mint;
