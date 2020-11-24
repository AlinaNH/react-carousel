import React from "react";

export const SlideNav = (props) => {
  const showSlide = (slideNumber) => {
    const slides = document.querySelectorAll(".slide-container");
    let nextSlide = slideNumber % slides.length;

    if (nextSlide < 0) nextSlide = slides.length - 1;
    props.setCurrentSlide(nextSlide);
    slides[props.currentSlide].style.display = "none";
    slides[nextSlide].style.display = "block";
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
    <div className="slidenav-container">
      <a className="prev-slide-button" onClick={() => changeSlide("prev")}>&#10094;</a>
      <a className="next-slide-button" onClick={() => changeSlide("next")}>&#10095;</a>
    </div>
  )
}