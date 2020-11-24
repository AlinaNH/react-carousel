import React, { useState, useEffect } from "react";
import "./Slide.css";

export const Slide = (props) => {
  const [display, setDisplay] = useState('none');

  const renderActive = () => {
    if(props.active) {
      useEffect(() => {
        setDisplay('block')
      }, [display]);
    }
  }

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
    <div className="slide-container" style={{display}}>
      { renderActive() }
      { renderContent() }
    </div>
  )
}