import React, { useEffect, useState } from "react";
import "./CarouselDots.css";

export const CarouselDots = (props) => {
  const [casouselDots, setCarouselDots] = useState([]);

  const showChosenSlide = (event) => {
    const chosenSlide = +event.target.getAttribute("data-dot-id");
    props.handleSlideChange(chosenSlide);
  }

  useEffect(() => {
    const slides = document.querySelectorAll(".slide-container");
    let result = [];
  
    slides.forEach((slide, index) => {
      result.push(
        (<div
          key={ index }
          className="carousel-dot"
          data-dot-id={ index }
          onClick={showChosenSlide}
        ></div>))
    });

    setCarouselDots(result);
  }, []);

  return (
    <div className="carousel-dots-container">
      { casouselDots }
    </div>
  )
}