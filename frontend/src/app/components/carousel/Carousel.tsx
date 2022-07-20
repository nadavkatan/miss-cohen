import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import hummus from "../../assets/images/hummus.jpeg";
import shakshuka from "../../assets/images/shakshuka.jpeg";
import ganouch from "../../assets/images/ganouch.jpeg";
import challah from "../../assets/images/challah.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./styles/carousel.css";
// import { createTheme, ThemeProvider } from "@mui/material";

interface CarouselProps {}

export const HomeCarousel: React.FC<CarouselProps> = ({}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // <ThemeProvider theme={theme}>
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
      {isSmallScreen ? (
        <div className="slide">
          <div className="slide-background">
            <img
              className="sm-screen-carousel-img"
              src={shakshuka}
              alt="slide-img"
            />
          </div>
        </div>
      ) : (
        <div className="slide">
          <div className="slide-background">
            <img className="carousel-img" src={hummus} alt="slide-img" />
            <img className="carousel-img" src={shakshuka} alt="slide-img" />
          </div>
        </div>
      )}
      {isSmallScreen ? (
        <div className="slide">
          <div className="slide-background">
            <img
              className="sm-screen-carousel-img"
              src={challah}
              alt="slide-img"
            />
          </div>
        </div>
      ) : (
        <div className="slide">
          <div className="slide-background">
            <img className="carousel-img" src={ganouch} alt="slide-img" />
            <img className="carousel-img" src={challah} alt="slide-img" />
          </div>
        </div>
      )}
    </Carousel>
    // </ThemeProvider>
  );
};
