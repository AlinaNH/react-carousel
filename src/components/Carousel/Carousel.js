import React, { Component } from "react";
import { CarouselNav } from "./CarouselNav/CarouselNav";
import { CarouselArrows } from "./CarouselArrows/CarouselArrows";
import { CarouselDots } from "./CarouselDots/CarouselDots";
import "./Carousel.css";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      slideWidth: 0,
      isForward: true,
      leftSlide: 0,
      transform: 0,
      infinityMode: false,
      activeSlides: 1,
      current: 0,
      touchMoveStart: 0,
      touchMoveEnd: 0
    };
    this.toggleInfinityMode = this.toggleInfinityMode.bind(this);
    this.setActiveSlides = this.setActiveSlides.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }


  toggleInfinityMode() {
    this.setState({ infinityMode: !this.state.infinityMode });
  }

  setActiveSlides(quantity) {
    const slides = document.querySelectorAll(".slide-container");
    const container = document.querySelector(".slides-container");
    slides.forEach((slide) => slide.firstChild.style.width = container.clientWidth / quantity + "px");
    this.setState({ activeSlides: quantity, slideWidth: container.clientWidth / quantity });
  }

  getMinPosition() {
    const positions = this.state.slides.map(slide => slide.position);
    const minPosition = Math.min(...positions);
    return this.state.slides.findIndex((slide) => slide.position === minPosition);
  }

  getMaxPosition() {
    const positions = this.state.slides.map(slide => slide.position);
    const maxPosition = Math.max(...positions);
    return this.state.slides.findIndex((slide) => slide.position === maxPosition);
  }

  handleSlideChange(isForward) {
    this.setState({}, () => {
      let leftSlide = this.state.leftSlide;
      const containerWidth = document.querySelector(".slides-container").clientWidth;
      const slideWidth = this.state.slideWidth;
      let nextSlide;
      const slides = this.state.slides;
      const step = slideWidth / containerWidth * 100;
      let transform = this.state.transform;
      let current = this.state.current;
      let previous;
      const dots = document.querySelectorAll(".carousel-dot");

      if (isForward) {
        leftSlide++;
        if ((leftSlide + containerWidth / slideWidth - 1) > slides[this.getMaxPosition()].position) {
          nextSlide = this.getMinPosition();
          slides[nextSlide].position = slides[this.getMaxPosition()].position + 1;
          slides[nextSlide].transform += slides.length * 100;
          slides[nextSlide].slide.style.transform = `translateX(${ slides[nextSlide].transform }%)`;
        }
        if (!this.state.infinityMode && ((leftSlide % slides.length > slides.length - 1) || (Math.abs(leftSlide) % slides.length === 0))) return;
        transform -= step;
        current++;
        if (current === slides.length) { current = 0; previous = slides.length - 1; } else previous = current - 1;
        this.setState({ leftSlide: leftSlide, slides: slides, transform: transform, current: current });
      }

      if (!isForward) {
        leftSlide--;
        if (leftSlide < slides[this.getMinPosition()].position) {
          nextSlide = this.getMaxPosition();
          slides[nextSlide].position = slides[this.getMinPosition()].position - 1;
          slides[nextSlide].transform -= slides.length * 100;
          slides[nextSlide].slide.style.transform = `translateX(${ slides[nextSlide].transform }%)`;
        }
        if (!this.state.infinityMode && (leftSlide % slides.length - 1) === -2) return;
        transform += step;
        current--;
        if (current < 0) { current = slides.length - 1; previous = 0; } else previous = current + 1;
        this.setState({ leftSlide: leftSlide, slides: slides, transform: transform, current: current });
      }

      dots[current].style.backgroundColor = "#3e728a";
      dots[previous].style.backgroundColor = "#494949";
      document.querySelector(".slides-container").style.transform = `translateX(${ transform }%)`;
    });
  }

  onTouchStart(e) {
    let touch;
    (e.nativeEvent.type === "touchstart")
      ? touch = e.changedTouches[0].pageX
      : touch = e.clientX;
    this.setState( { touchMoveStart: touch });
  }

  onTouchEnd(e) {
    if (
        (e.target !== document.querySelector(".next-slide-button")) &&
        (e.target !== document.querySelector(".prev-slide-button"))
      ) {
      let touch;
      (e.nativeEvent.type === "touchend")
        ? touch = e.changedTouches[0].pageX
        : touch = e.clientX;
      this.setState( { touchMoveEnd: touch }, () => {
        (this.state.touchMoveEnd < this.state.touchMoveStart)
          ? document
            .querySelector(".next-slide-button")
            .dispatchEvent(new Event("click", { bubbles: true }))
          : document
            .querySelector(".prev-slide-button")
            .dispatchEvent(new Event("click", { bubbles: true }))
      });
    }
  }

  componentDidMount() {
    this.setState({}, () => {
      const slides = document.querySelectorAll(".slide-container");
      const slidesData = [];
  
      [...slides].forEach((slide, index) => {
        slidesData.push({
          slide: slide,
          position: index,
          transform: 0
        });
      });
      this.setState({ slides: slidesData, slideWidth: slides[0].clientWidth });
      document.querySelector(".slide-container").style.display = "flex";
      document.querySelector(".carousel-dot").style.backgroundColor = "#3e728a";
    })
  }

  render() {
    return (
      <div
        className="carousel-container"
        onTouchStart = { this.onTouchStart }
        onTouchEnd = { this.onTouchEnd }
        onMouseDown = { this.onTouchStart }
        onMouseUp = { this.onTouchEnd }
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
        infinityMode={ this.state.infinityMode }
        activeSlides={ this.state.activeSlides }
        handleSlideChange={ this.handleSlideChange }
      />
      <div className="slides-container">
        { this.props.children }
      </div>
      <CarouselDots />
    </div>
    );
  }
}