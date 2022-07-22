
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import PriceModalStyleWrapper from "./PriceModal.style";
import PriceSlider from './../../../components/price/priceSlider';


const PriceModal=()=> {

    const {priceModalHandle } = useModal();

  const reload = () => window.location.reload();

  return (
    <>
      <PriceModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content"> 
              <Button onClick={() => priceModalHandle()} onClose={reload}>
                <FiX />
              </Button>
               <PriceSlider/>
          </div>
        </div>
      </PriceModalStyleWrapper>
    </>
  );
}

export default PriceModal