import React from "react";
import "./CarouselArrows.css";

export const CarouselArrows = (props) => {
  const changeSlide = (isForward) => {
    props.handleSlideChange(isForward);
  }

  return (
    <div className="carousel-arrows-container">
      <a className="prev-slide-button" onClick={() => changeSlide(false)}>&#10094;</a>
      <a className="next-slide-button" onClick={() => changeSlide(true)}>&#10095;</a>
    </div>
  )
}