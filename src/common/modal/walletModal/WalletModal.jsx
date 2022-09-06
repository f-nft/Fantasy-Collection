import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";

const WalletModal = () => {
  const { walletModalHandle,
  } = useModal();

  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please Connect Wallet to start Minting your NFTs
              </p>
            
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <a href="# ">Terms of Service</a>
                <a href="# ">Privacy Policy</a>
              </div>
            </div>
            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </WalletModalStyleWrapper>
    </>
  )
}

export default WalletModal;