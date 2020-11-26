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

  changeSlideAndDotByIndex(index, operation) {
    const slides = document.querySelectorAll(".slide-container");
    const dots = document.querySelectorAll(".carousel-dot");
    if (operation === "show") {
      slides[index].style.display = "block";
      dots[index].style.backgroundColor = "#3e728a";
    }
    if (operation === "hide") {
      slides[index].style.display = "none";
      dots[index].style.backgroundColor = "#494949";
    }
  }

  renderActiveSlides() {
    this.setState(
      { currentSlide: this.state.currentSlide },
      () => {
        const slides = document.querySelectorAll(".slide-container");

        this.changeSlideAndDotByIndex(this.state.currentSlide, "show");
        if (this.state.activeSlides === 2) {
          if(this.state.currentSlide === slides.length - 1) {
            this.changeSlideAndDotByIndex(0, "show");
            this.changeSlideAndDotByIndex(slides.length - 1, "show");
          }

          if(this.state.currentSlide === slides.length - 2)
            this.changeSlideAndDotByIndex(slides.length - 1, "show");

          (this.state.currentSlide + 1 < slides.length - 1)
            ? this.changeSlideAndDotByIndex(this.state.currentSlide + 1, "show")
            : this.changeSlideAndDotByIndex(this.state.currentSlide, "show");
        }
       }
    );
  }

  hideInactiveSlides() {
    const slides = document.querySelectorAll(".slide-container");

    this.changeSlideAndDotByIndex(this.state.currentSlide, "hide");
    if (this.state.activeSlides === 2) {
      if(this.state.currentSlide === slides.length - 1)
        this.changeSlideAndDotByIndex(0, "hide");

      if(this.state.currentSlide === 0) 
        this.changeSlideAndDotByIndex(slides.length - 1, "hide");
      
        if(this.state.currentSlide === slides.length - 2) {
          this.changeSlideAndDotByIndex(slides.length - 1, "hide");
        }
    
      (this.state.currentSlide + 1 < slides.length - 1)
      ? this.changeSlideAndDotByIndex(this.state.currentSlide + 1, "hide")
      : this.changeSlideAndDotByIndex(this.state.currentSlide, "hide");
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
    if (
        (e.target !== document.querySelector('.next-slide-button')) &&
        (e.target !== document.querySelector('.prev-slide-button'))
      ) {
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