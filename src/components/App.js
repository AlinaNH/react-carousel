import React from "react";
import { Carousel } from "./Carousel/Carousel";
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
        <Slide type="image" content={ DATA.imgIndonesia } active />
        <Slide type="text" content={ DATA.articleIndonesia } />

        <Slide type="image" content={ DATA.imgIndia } />
        <Slide type="text" content={ DATA.articleIndia } />

        <Slide type="image" content={ DATA.imgJapan } />
        <Slide type="text" content={ DATA.articleJapan } />

        <Slide type="image" content={ DATA.imgThailand } />
        <Slide type="text" content={ DATA.articleThailand } />

        <Slide type="image" content={ DATA.imgChina } />
        <Slide type="text" content={ DATA.articleChina } />

        <Slide type="video" content={ DATA.videoCountries } />
      </Carousel>
    </div>
  );
}