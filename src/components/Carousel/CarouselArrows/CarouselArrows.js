import React from "react";
import "./CarouselArrows.css";

export const CarouselArrows = (props) => {
  const changeSlide = (isForward) => {
    const slides = document.querySelectorAll(".slide-container");
    const currentSlide = [...slides].findIndex((slide) => slide.style.display === "block");
    let nextSlide = (isForward) ? currentSlide + 1 : currentSlide - 1;
    nextSlide = nextSlide % slides.length;
    if (nextSlide < 0) nextSlide = slides.length - 1;
    props.handleSlideChange(nextSlide);
  }

  return (
    <div className="carousel-arrows-container">
      <a className="prev-slide-button" onClick={() => changeSlide(false)}>&#10094;</a>
      <a className="next-slide-button" onClick={() => changeSlide(true)}>&#10095;</a>
    </div>
  )
}