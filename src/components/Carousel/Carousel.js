import React from "react";
import { CarouselNav } from "./CarouselNav/CarouselNav";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";
import { CarouselDots } from './CarouselDots/CarouselDots';

export const Carousel = (props) => {
  let currentSlide = 0;
  let infinityMode = false;
  const toggleInfinityMode = () => infinityMode = !infinityMode;
  const getInfinityMode = () => infinityMode;

  const handleSlideChange = (nextSlide) => {
    const slides = document.querySelectorAll(".slide-container");
    const dots = document.querySelectorAll(".carousel-dot");

    dots[currentSlide].style.backgroundColor = "#494949";
    slides[currentSlide].style.display = "none";
    slides[nextSlide].style.display = "block";
    dots[nextSlide].style.backgroundColor = "#3e728a";

    currentSlide = nextSlide;
  }

  return (
    <div className="carousel-container">
      <CarouselNav title={ props.navTitle } toggleInfinityMode={ toggleInfinityMode } />
      <CarouselArrows handleSlideChange={ handleSlideChange } getInfinityMode={ getInfinityMode } />
      { props.children }
      <CarouselDots handleSlideChange={ handleSlideChange } />
    </div>
  )
}