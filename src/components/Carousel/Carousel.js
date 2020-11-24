import React, { useState } from "react";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";

export const Carousel = (props) => {
  const [currentSlide, setCurrentSlide ] = useState(0);

  return (
    <div className="carousel-container">
      <CarouselArrows currentSlide={ currentSlide } setCurrentSlide={ setCurrentSlide } />
      { props.children }
    </div>
  )
}