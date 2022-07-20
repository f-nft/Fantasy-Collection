import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import modalBg from "../../../assets/images/bg/modal2_overlay.png";

const modalAnimation = keyframes`${fadeIn}`;

const MintModalStyleWrapper = styled.div`
  &.modal_overlay {
    position: fixed;
    height: 30%;
    width: 100%;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
    z-index: 99;
    display: flex;
    justify-content: center;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      height: 50%;
      width: 50%;
      background: #000;
      content: "";
      opacity: 0.79;
      backdrop-filter: blur(33px);
    }
  }

  .mint_modal_box {
    position: absolute;
    width: 500px;
    margin: auto;
    animation: 1s ${modalAnimation}; /* ********* */

    &::before {
      backdrop-filter: blur(5px);
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #171c21;
      content: "";
    }
  }

  .mint_modal_content {
    height: 50%;
    width: 50%;
    background: url(${modalBg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .modal_header {
    h2 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 200;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      max-width: 280px;
      margin: auto;
      margin-bottom: 10px;
    }

    button {
      background: transparent;
      border: none;
      outline: none;
      height: 39px;
      width: 39px;
      position: absolute;
      right: 0px;
      top: 0px;
      overflow: hidden;
      display: flex;
      justify-content: end;
      align-items: baseline;

      svg {
        margin-top: 5px;
        color: #ffffff;
      }

      &:before {
        content: "";
        background: rgba(255, 255, 255, 0.1);
        height: 150%;
        width: 150%;
        position: absolute;
        right: -35px;
        top: -35px;
        transform: rotate(45deg);
      }
    }
  }

  .mint_count_list {
    margin: 30px 0px;
    ul {
      padding: 0;
      margin: 0;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        h5 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 800;
          font-size: 16px;
          line-height: 16px;
          text-align: right;
          color: #ffffff;
          margin: 0;
        }

        .mint_quantity_sect {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 100px;
          width: 100%;
          height: 100%;

          button {
            border: none;
            outline: none;
            background: transparent;
            padding: 0px;
            font-family: "Bakbak One";
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 16px;
            text-align: center;
            text-transform: uppercase;
            color: #ffffff;
          }

          input {
            max-width: 50px;
            width: 50%;
            border: none;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            padding: 0px 20px;
            outline: none;
            font-family: "Bakbak One";
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            text-transform: uppercase;
            color: #ffffff;
          }
        }
      }
    }
  }

  .modal_mint_btn {
    button {
      align: center;
      width: 100%;
    }
  }
  .modal_bottom_shape {
    position: absolute;
    bottom: 30px;

    &.shape_left {
      left: 10px;
      transform: rotate(-90deg);
    }
    &.shape_right {
      right: 10px;
      transform: rotate(180deg);
    }
  }
  .mint_img {
    align: center;
    width: 100%;
    height: 100%;
    
  }
`;

export default MintModalStyleWrapper;
