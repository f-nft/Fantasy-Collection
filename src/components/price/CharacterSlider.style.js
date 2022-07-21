import styled from "styled-components";

const CharacterSliderWrapper = styled.section`
  padding: 20px 20px;
  position: fixed;
  z-index: 999;
  height: 50%;
  width: 50%;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;

  .slick-slider {
    .slick-list {
      margin: 0 -15px;
    }

    .slick-slide {
      height: auto; // ← that must not be ignored
    }
    .slick-track {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;
    }
  }
  .slick__slider__item {
    padding: 0 5px;
  }

`;

export default CharacterSliderWrapper;
