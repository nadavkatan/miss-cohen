import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { HomeSection } from "../../sections/homeSection/HomeSection";
import { FeaturedSection } from "../../sections/featuredSection/FeaturedSection";
import { fetchProducts } from "../../features/products/productsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  // const updateOnSale = async () => {
  //   const response = await axios({
  //     method: "PUT",
  //     url: `${BASE_URL}/products/update/62cef53443b0a68eb9760871`,
  //     data: {
  //       onSale: false,
  //       discount: 0,
  //     },
  //   });
  //   console.log(response);
  // };

  // useEffect(() => {
  //   updateOnSale();
  // }, []);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Box>
      <HomeSection />
      <FeaturedSection />
    </Box>
  );
};
