import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { HomeSection } from "../../sections/homeSection/HomeSection";
import { FeaturedSection } from "../../sections/featuredSection/FeaturedSection";
import { fetchProducts } from "../../features/products/productsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { AboutSection } from "../../sections/aboutSection/AboutSection";
import background from "../../assets/images/background.png";
import "./styles/homePage.css";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  return (
    <Box>
      <HomeSection />
      <Box className="sections" sx={{ backgroundImage: `url(${background})` }}>
        <FeaturedSection />
        <AboutSection />
      </Box>
    </Box>
  );
};
