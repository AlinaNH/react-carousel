import React from "react";
import "./Slide.css";

export const Slide = (props) => {

  const renderContent = () => {
    let result;
    switch(props.type) {
      case "image":
        result = (<img src={props.content} />);
        break;

      case "text":
        result = (<div>{ props.content }</div>);
        break;

      case "video":
        result = (<iframe src={ props.content }></iframe>);
        break;
    }
    return result;
  }

  return (
    <div className="slide-container">
      { renderContent() }
    </div>
  )
}