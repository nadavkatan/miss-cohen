import React from "react";
import Box from "@mui/material/Box";
import { HomeCarousel } from "../../components/carousel/Carousel";
import "./styles/homeSection.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

interface HomeSectionProps {}

export const HomeSection: React.FC<HomeSectionProps> = ({}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className={
        isSmallScreen
          ? "sm-screen-home-section-wrapper"
          : "home-section-wrapper"
      }
    >
      <Box className="home-section-carousel-container">
        <HomeCarousel />
      </Box>
      <Box className="home-section-heading-container">
        <Typography variant="h2" color="white" className="home-section-heading">
          Miss Cohen's Kitchen
        </Typography>
        <Button variant="contained" size="large" className="see-products-btn">
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "white" }}
          >
            See products
          </Link>
        </Button>
      </Box>
    </Box>
  );
};
