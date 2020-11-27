import React from "react";
import "./CarouselNav.css";

export const CarouselNav = (props) => {
  const handleChange = (e) => {
    const quantity = +e.target[e.target.selectedIndex].text;
    props.setActiveSlides(quantity);
  }

  return (
    <div className="carousel-nav-container">
      <div>{props.title}</div>
      <div className="carousel-nav-button-container">
        <label>Infinity Mode</label>
        <input type="checkbox" onClick={ props.toggleInfinityMode }/>
        {
          (window.innerWidth > 414)
          ? (
            <>
              <label>Show slides:</label>
              <select onChange={ handleChange }>
                <option>1</option>
                <option>2</option>
              </select>
            </>
          )
          : <></>
        }
      </div>
    </div>
  );
}