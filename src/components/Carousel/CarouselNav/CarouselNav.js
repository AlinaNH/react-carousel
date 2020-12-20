import React from "react";
import "./CarouselNav.css";

export const CarouselNav = (props) => {
  return (
    <div className="carousel-nav-container">
      <div>{props.title}</div>
      <div className="carousel-nav-button-container">
        <label>Infinity Mode</label>
        <input type="checkbox" onClick={ props.toggleInfinityMode }/>
      </div>
    </div>
  );
}