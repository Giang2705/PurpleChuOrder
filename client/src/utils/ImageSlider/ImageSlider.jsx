import React, { useState } from "react";
const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="sliderStyles">
      <div>
        {slides.length > 1 ? (
          <div>
            <div onClick={goToPrevious} className="leftArrowStyles">
              ❰
            </div>
            <div onClick={goToNext} className="rightArrowStyles">
              ❱
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="slideStylesWidthBackground"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
    </div>
  );
};

export default ImageSlider;
