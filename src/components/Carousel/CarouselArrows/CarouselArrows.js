import React from "react";
import "./CarouselArrows.css";

export const CarouselArrows = (props) => {
  const changeSlide = (isForward) => {
    const slides = document.querySelectorAll(".slide-container");
    let nextSlide = (isForward)
      ? props.currentSlide + props.activeSlides
      : props.currentSlide - props.activeSlides;
  
    if (props.infinityMode) {
      nextSlide = nextSlide % slides.length;
      if (nextSlide < 0) nextSlide = slides.length - 1;
      if ((props.activeSlides > 1) && (nextSlide === 1)) nextSlide = 0;
    } else {
      if (nextSlide < 0) nextSlide = 0;
      if (nextSlide > slides.length - 1) nextSlide = slides.length - 1;
    }

    props.handleSlideChange(nextSlide);
  }

  return (
    <div className="carousel-arrows-container">
      <a className="prev-slide-button" onClick={() => changeSlide(false)}>&#10094;</a>
      <a className="next-slide-button" onClick={() => changeSlide(true)}>&#10095;</a>
    </div>
  )
}