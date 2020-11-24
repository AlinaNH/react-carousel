import React, { useState } from "react";
import { SlideNav } from "./SlideNav/SlideNav";

export const Carousel = (props) => {
  const [currentSlide, setCurrentSlide ] = useState(0);

  return (
    <div className="carousel-container">
      <SlideNav currentSlide={ currentSlide } setCurrentSlide={ setCurrentSlide } />
      { props.children }
    </div>
  )
}