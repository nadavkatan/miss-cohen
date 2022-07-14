import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import logo from "../../assets/images/miss-cohen-logo.png";
import hummus from "../../assets/images/hummus.jpeg";
import shakshuka from "../../assets/images/shakshuka.jpeg";
import ganouch from "../../assets/images/ganouch.jpeg";
import challah from "../../assets/images/challah.png";
import falafel from "../../assets/images/falafel.png";
import labaneh from "../../assets/images/labaneh.png";
import "./styles/carousel.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';

interface CarouselProps {}

export const HomeCarousel: React.FC<CarouselProps> = ({}) => {
  return (
    <Carousel
      className="carousel"
      autoPlay
      interval={8000}
      showArrows={false}
      showThumbs={false}
      stopOnHover={false}
      swipeable
      showStatus={false}
      infiniteLoop
      showIndicators={false}
    >
      <div className="slide">
        <div className="slide-background">
          <img className="carousel-img" src={hummus} alt="slide-img" />
          <img className="carousel-img" src={shakshuka} alt="slide-img" />
        </div>
        <div className="slide-content">
        {/* <Typography variant="h3">Miss Cohen's Kitchen</Typography> */}
        <Button variant="contained" size="large" className="see-products-btn"><Link to="/products" style={{textDecoration:'none', color:'white'}}>See products</Link></Button>
        </div>
      </div>

      <div className="slide">
        <div className="slide-background">
        <img className="carousel-img" src={ganouch} alt="slide-img" />
        <img className="carousel-img" src={challah} alt="slide-img" />
        </div>
        <div className="slide-content">
        {/* <Typography variant="h3">Discover our products</Typography> */}
        <Button variant="contained" size="large" className="see-products-btn"><Link to="/products" style={{textDecoration:'none', color:'white'}}> See products</Link></Button>
        </div>

      </div>
    </Carousel>
  );
};
