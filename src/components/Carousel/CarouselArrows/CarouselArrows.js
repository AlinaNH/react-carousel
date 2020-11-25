import React from "react";
import "./CarouselArrows.css";

export const CarouselArrows = (props) => {
  const showSlide = (slideNumber) => {
    const slides = document.querySelectorAll(".slide-container");
    let nextSlide = slideNumber % slides.length;
    if (nextSlide < 0) nextSlide = slides.length - 1;
    props.handleSlideChange(nextSlide);
  }

  const changeSlide = (path) => {
    switch(path) {
      case "prev": {
        showSlide(props.currentSlide - 1);
        break;
      }
      case "next": {
        showSlide(props.currentSlide + 1);
        break;
      }
    }
  }

  return (
    <div className="carousel-arrows-container">
      <a className="prev-slide-button" onClick={() => changeSlide("prev")}>&#10094;</a>
      <a className="next-slide-button" onClick={() => changeSlide("next")}>&#10095;</a>
    </div>
  )
}