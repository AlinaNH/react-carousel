import React, { Component } from "react";
import { CarouselNav } from "./CarouselNav/CarouselNav";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";
import { CarouselDots } from './CarouselDots/CarouselDots';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      infinityMode: false
    };
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.toggleInfinityMode = this.toggleInfinityMode.bind(this);
  }

  toggleInfinityMode() {
    this.setState({ infinityMode: !this.state.infinityMode });
  }

  handleSlideChange(nextSlide) {
    const slides = document.querySelectorAll(".slide-container");
    const dots = document.querySelectorAll(".carousel-dot");

    dots[this.state.currentSlide].style.backgroundColor = "#494949";
    slides[this.state.currentSlide].style.display = "none";
    slides[nextSlide].style.display = "block";
    dots[nextSlide].style.backgroundColor = "#3e728a";

    this.setState({ currentSlide: nextSlide });
  }

  render() {
    return (
      <div className="carousel-container">
       <CarouselNav
        title={ this.props.navTitle }
        toggleInfinityMode= { this.toggleInfinityMode }
      />
      <CarouselArrows
        currentSlide={ this.state.currentSlide }
        infinityMode={ this.state. infinityMode }
        handleSlideChange={ this.handleSlideChange }
      />
      { this.props.children }
      <CarouselDots
        handleSlideChange={ this.handleSlideChange }
      />
    </div>
    );
  }
}