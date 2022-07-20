import React from "react";
import { useAppSelector } from "../../hooks";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProductCard } from "../../components/productCard/ProductCard";
import "./styles/featuredSection.css";

interface sectioFeaturedSectionPropsn {}

export const FeaturedSection: React.FC<sectioFeaturedSectionPropsn> = ({}) => {
  const { products } = useAppSelector((state) => state.products);
  return (
    <Box className="featured-section-container">
      <Typography className="featured-section-title" variant="h3">
        On Sale
      </Typography>
      <Grid container spacing={3} className="featured-products-wrapper">
        {products.length > 0 &&
          products.map((product) => {
            if (product.onSale) {
              console.log(product);
              return (
                <Grid item key={product._id} lg={3} md={4} sm={6} xs={12}>
                  <ProductCard
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.imgUrl}
                    qtyInStock={product.qtyInStock}
                    discount={product.discount}
                    onSale={product.onSale}
                  />
                </Grid>
              );
            }
          })}
      </Grid>
    </Box>
  );
};
