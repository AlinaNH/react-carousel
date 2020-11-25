import React from "react";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";
import { CarouselDots } from './CarouselDots/CarouselDots';

export const Carousel = (props) => {
  let currentSlide = 0;

  const handleSlideChange = (nextSlide) => {
    const slides = document.querySelectorAll(".slide-container");
    const dots = document.querySelectorAll(".carousel-dot");

    slides[currentSlide].style.display = "none";
    slides[nextSlide].style.display = "block";
    dots[currentSlide].style.backgroundColor = "#494949";
    dots[nextSlide].style.backgroundColor = "#3e728a";

    currentSlide = nextSlide;
  }

  return (
    <div className="carousel-container">
      <CarouselArrows currentSlide={ currentSlide } handleSlideChange={ handleSlideChange} />
      { props.children }
      <CarouselDots handleSlideChange={ handleSlideChange} />
    </div>
  )
}