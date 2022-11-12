import React from "react";
import Clock from "../../components/countDownClock/Clock";
import Carousel from "../../utils/Carousel/Carousel";
import ProductsCarousel from "../../utils/Carousel/ProductsCarousel";
import NoticePanel from "../../utils/NoticePanel/NoticePanel";

const Landing = () => {
  return (
    <>
      <Carousel />
      <ProductsCarousel />
      {/* <NoticePanel /> */}
    </>
  );
};

export default Landing;
