import { Slider, SliderItem } from "../../common/slider/Slider";
import priceData from "../../assets/data/characterSlider/PriceSlider";
import CharacterSliderWrapper from "./CharacterSlider.style";

const PriceSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1425,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <CharacterSliderWrapper>
      <Slider {...settings}>
        {priceData?.map((item, i) => (
          <SliderItem key={i}>
            <div className="character-thumb">
              <img src={item.thumb} alt="f-nft price" />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </CharacterSliderWrapper>
  );
};

export default PriceSlider;
