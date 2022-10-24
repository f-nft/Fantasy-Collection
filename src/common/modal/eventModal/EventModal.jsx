import { Typewriter } from "react-simple-typewriter";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import EventModalWrapper from "./Event.style";
import mintImg from "../../../assets/images/nft/3_chr_img.png";
import data from "../../../assets/data/eventdata";
import {GiDevilMask} from "react-icons/gi";
import {MdEmojiEvents} from "react-icons/md";

const EventModal = () => {
  const {seteventhandler} = useModal();

  const reload = () => window.location.reload();



  return (
    <>
      <EventModalWrapper className="modal_over">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2> <span  className="bump"><MdEmojiEvents/>BUMP<MdEmojiEvents/></span></h2>
              <h4 className="eventtype">
                <Typewriter
                words={['Event is Live']}
                loop={2}
                cursor
                cursorStyle='!'
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
              </h4>
              <div className="mint_img">
                <img src={mintImg} alt="f-nft mint" style={{ borderRadius: "15px", borderWidth: "5px", borderColor: "#ffffff", textAlign: "center", borderShadow: "#ffffff" }} />
              
        
              </div>
              <Button onClick={() => seteventhandler(false)} onClose={reload}>
                <FiX />
              </Button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_count_list">
                <h6>
                  <span className="bump2">Join & Follow Us</span>
                </h6>
                <ul>
              {data?.map((item, i) => (
                <li key={i}>
                   <h6 className="itemname">
                    {item.name}
                 </h6>
                  <a href={item.url}>
                    {item.thumb ? (
                      <img src={item.thumb} alt="f-nft nft profiles" />
                    ) : (
                      item.icon
                    )}
                  </a>
                
                 
                </li>
                
              ))}
              
            </ul>
              </div>
              
              <h6>
                  <span className="bump"><GiDevilMask/> Awards <GiDevilMask/> </span>
                </h6>
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h6 className="itemname">1</h6>
                    <p>Discover F-NFT ($239) </p>
                  </li>
                  <li>
                       <h6 className="itemname">2</h6>
                    <p>Reclamation F-NFT ($139)</p>
                  </li>
                  <li>
                       <h6 className="itemname">3</h6>
                    <p> Free Mint ($66)</p>
                  </li>
                </ul>
                </div>
            </div>
          
          </div>
        </div>
      </EventModalWrapper>
    </>
  );
};

export default EventModal;
