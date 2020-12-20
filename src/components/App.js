import React from "react";
import Carousel from "./Carousel/Carousel";
import { Slide } from "./Carousel/Slide/Slide";
import { DATA } from "./../sources/data";
import "./App.css";

export const App = () => {
  return (
    <div className="app-container">
      <Carousel
        enableNav={ true }
        navTitle="Best countries to visit in Asia"
      >
        <Slide type="image" content={ DATA.imgIndonesia } />
        <Slide type="text" content={ DATA.articleIndonesia } />

        <Slide type="image" content={ DATA.imgIndia } />
        <Slide type="text" content={ DATA.articleIndia } />

        <Slide type="html" content={ DATA.html } />

        <Slide type="video" content={ DATA.videoCountries } />
      </Carousel>
    </div>
  );
}