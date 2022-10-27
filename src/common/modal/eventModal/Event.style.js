import styled from "styled-components";


const MintModalStyleWrapper = styled.div`
  &.modal_over {
    border-width: 5px;
    border-radius: 25px;
    position: absolute;
    max-height: 50%;
    min-height: 50%;
    max-width: 39%;
    min-width: 300px;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    justify-content: center;
   
    .mint_img {
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px
  }

  }
  .bump{
    text-shadow: #B10089 0px 0px 15px;
  color:bisque;
  font-size: 30px;
  }
  .bump2{
    text-shadow: #B10089 0px 0px 15px;
  color:red;
  font-size: 30px;
  }
  .eventtype{
    text-shadow: #B10089 0px 0px 15px;
  color:red;
  text-align: center;
  }
  .itemname{
    text-shadow: #B10089 0px 0px 15px;
  color:bisque;
  }
  .mint_modal_box {
    border: 2px solid #B10089;
    animation: modal 0.5s;
    border-radius: 25px;
    position: relative;
    margin-top: 80px;
    width: 550px;
    max-width: 500px;
    max-height: 50%;
    height: 100%;
    min-width: 300px;
    &::before {
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
 
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      min-width: 300px;
      background: #171c24;
      content: "";
    }

    .mint_img {
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
  }

  }
  .mint_modal_content {
    border: 5px 5px solid #B10089;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
    height: 70%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 40px;
    padding-bottom: 10px;
    position: relative;
    display: flex;
    min-width: 300px;
    flex-direction: column;
  }

  .modal_header {
    h2 {
     
      font-style: bold;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      max-width: 380px;
      min-width: 300px;
      margin: auto;
      margin-top: -10px;
      margin-bottom: 10px;
    }

    button {
      border: 5px solid black;
    border-color: gold;
    border-width: 0px;
    border-radius: 5px;
      background: transparent;
      border: none;
      outline: none;
      height: 45px;
      width: 45px;
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
        border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
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
        height: 39px;
        border-bottom: 3px solid rgba(255, 255, 255, 0.1);
        h5 {
          font-family: "Bakbak One";
          font-style: normal;
          font-weight: 100;
          font-size: 15px;
          line-height: 10px;
          text-align: right;
          color: #fffff7;
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
            border: 1px solid black;
            border-color: gold;
            border-width: 1px;
            border-radius: 25px;
            outline: none;
            background: transparent;
            padding: 0px;
            font-family: "Bakbak One";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            text-transform: uppercase;
            color: #ffffff;
          }
          input {
            max-width: 58px;
            width: 100%;
            border: none;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            padding: 0px 0px;
            outline: none;
            font-family: "Arial";
            font-style: normal;
            font-weight: 200;
            font-size: 16px;
            line-height: 25px;
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
      border: 1px solid black;
    border-color: black;
    border-width: 1px;
    border-radius: 25px;
      width: 100%;
    }
  }

  .modal_bottom_shape {
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
    position: absolute;
    bottom: 5px;
    &.shape_left {
      left: 10px;
      transform: rotate(-90deg);
    }
    &.shape_right {
      right: 10px;
      transform: rotate(180deg);
    }
  }
  
  .mint_img 
  {
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
  }
`;
export default MintModalStyleWrapper;