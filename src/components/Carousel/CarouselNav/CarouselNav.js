import React from "react";
import "./CarouselNav.css";

export const CarouselNav = (props) => {
  return (
    <div className="carousel-nav-container">
      {props.title}
      <div className="carousel-nav-button-container">
        <label>Infinity Mode</label>
        <input type="checkbox" onClick={ props.toggleInfinityMode }/>
        <label>Show slides:</label>
        <select>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
    </div>
  );
}