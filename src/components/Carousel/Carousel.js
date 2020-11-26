import React, { Component } from "react";
import { CarouselNav } from "./CarouselNav/CarouselNav";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";
import { CarouselDots } from './CarouselDots/CarouselDots';
import "./Carousel.css";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      infinityMode: false,
      activeSlides: 1,
      touchMoveStart: 0,
      touchMoveEnd: 0
    };
    this.toggleInfinityMode = this.toggleInfinityMode.bind(this);
    this.setActiveSlides = this.setActiveSlides.bind(this);
    this.renderActiveSlides = this.renderActiveSlides.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  toggleInfinityMode() {
    this.setState({ infinityMode: !this.state.infinityMode });
  }

  setActiveSlides(quantity) {
    this.setState({ activeSlides: quantity });
    this.renderActiveSlides();
    this.hideInactiveSlides();
  }

  renderActiveSlides() {
    this.setState(
      { currentSlide: this.state.currentSlide },
      () => {
        const slides = document.querySelectorAll(".slide-container");
        const dots = document.querySelectorAll(".carousel-dot");
        let index;

        for(let i = 0; i < this.state.activeSlides; i++) {
          index = this.state.currentSlide + i;
          if (index === slides.length) index = slides.length - 2;
          slides[index].style.display = "block";
        }

        slides.forEach((slide, index) => {
          (slide.style.display === "block")
            ? dots[index].style.backgroundColor = "#3e728a"
            : dots[index].style.backgroundColor = "#494949";
        });
       }
    );
  }

  hideInactiveSlides() {
    const slides = document.querySelectorAll(".slide-container");
    const dots = document.querySelectorAll(".carousel-dot");
    let index = 0;

    for(let i = this.state.activeSlides; i > 0; i--) {
      if(this.state.currentSlide > slides.length - 1) return;
      if ((this.state.activeSlides > 1) && (this.state.currentSlide < slides.length - 1)) {
        slides[this.state.currentSlide + 1 - index].style.display = "none";
      } else {
        slides[this.state.currentSlide - index].style.display = "none";
      }
      ++index;
    }
  }

  handleSlideChange(nextSlide) {
    this.hideInactiveSlides();
    this.setState({ currentSlide: nextSlide }, () => {
        this.renderActiveSlides();
    });
  }

  componentDidMount() {
    this.renderActiveSlides();
  }

  onTouchStart(e) {
    const touch = e.changedTouches[0].pageX;
    this.setState( { touchMoveStart: touch });
  }

  onTouchEnd(e) {
    const touch = e.changedTouches[0].pageX;
    this.setState( { touchMoveEnd: touch }, () => {
      (this.state.touchMoveEnd < this.state.touchMoveStart)
        ? document
          .querySelector('.next-slide-button')
          .dispatchEvent(new Event("click", { bubbles: true }))
        : document
          .querySelector('.prev-slide-button')
          .dispatchEvent(new Event("click", { bubbles: true }))
    });
  }

  render() {
    return (
      <div
        className="carousel-container"
        onTouchStart = { this.onTouchStart }
        onTouchEnd = { this.onTouchEnd }
      >
      {
        (this.props.enableNav)
          ? <CarouselNav
              title={ this.props.navTitle }
              toggleInfinityMode={ this.toggleInfinityMode }
              setActiveSlides={ this.setActiveSlides }
            />
          : <></>
      }
      <CarouselArrows
        currentSlide={ this.state.currentSlide }
        infinityMode={ this.state.infinityMode }
        activeSlides={ this.state.activeSlides }
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