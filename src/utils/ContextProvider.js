import { useState } from "react";
import { ModalContext } from "./ModalContext";

const ContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [priceModalVisibiity, setPriceModalVisibility] = useState(false);
  const [isWalletConnect, setIsWalletConnect] = useState(false);


  const mintButtonHandler = () => {
    setIsWalletConnect(true);
  }

  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  
  const priceModalHandle=()=>{
    setPriceModalVisibility(!priceModalVisibiity);
  }
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        priceModalVisibiity,
        shareModalHandle,
        priceModalHandle,
        isWalletConnect,
        mintButtonHandler
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
