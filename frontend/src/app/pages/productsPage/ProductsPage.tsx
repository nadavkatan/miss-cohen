import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchProducts } from "../../features/products/productsSlice";
import { Box, Grid } from "@mui/material";
import { ProductCard } from "../../components/productCard/ProductCard";
import background from "../../assets/images/background.png";
import "./styles/productPage.css";

interface ProductsPageProps {}

export const ProductsPage: React.FC<ProductsPageProps> = ({}) => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Box
      className="product-page-wrapper"
      sx={{ backgroundImage: `url(${background})` }}
    >
      <Grid container spacing={3} className="product-page-container">
        {products.length &&
          products.map((product, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
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
          })}
      </Grid>
    </Box>
  );
};
