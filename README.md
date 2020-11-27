## React Carousel

React.js adaptive component Carousel (slideshow)


## Installation

```
git clone https://github.com/AlinaNH/react-carousel.git
cd react-carousel
npm install
```


## Running the app

```
npm run start
```

## Usage

Here is a quick example to get you started:

```import React from "react";
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
        <Slide type="video" content={ DATA.videoCountries } />
      </Carousel>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

The component is located in ```Carousel``` folder which you should import to your file where you are going to use this component.

```Carousel``` component has next props:

Prop | Type | Definition |
------------ | ------------- | ------------- |
enableNav | ```boolean``` | turn on / turn off navigation for ```Carousel```
navTitle | ```string``` | title for ```Carousel``` which will be indicated in navigation

Navigation includes title for ```Carousel```, ```infinity mode``` checkbox and ```show slides``` selection. ```Infinity mode``` provides infinite slide scrolling. ```Show slides``` allows to choose how many slides should be shown on the screen (one or two). ```Show slides``` is not supported into vertical position of the phone.

Child component of ```Carousel``` — ```Slide``` component — includes content which should be represented on slides (images, text or video). Here is its props:

Prop | Type | Definition |
------------ | ------------- | ------------- |
type | ```image``` / ```text``` / ```video``` | type of the context which should be represented on slide
content | ```string``` | string for ```text``` or path for ```image``` or ```video```


## Demo

Link to CodeSandbox: https://codesandbox.io/s/react-carousel-birto

Demo: https://birto.sse.codesandbox.io/