import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchProducts } from "../../features/products/productsSlice";
import { Grid } from "@mui/material";
import { ProductCard } from "../../components/productCard/ProductCard";

interface ProductsPageProps {}

export const ProductsPage: React.FC<ProductsPageProps> = ({}) => {
  const { products } = useAppSelector((state) => state.products);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return (
    <Grid container spacing={3} style={{ padding: "2em 8em" }}>
      {products.length &&
        products.map((product, i) => {
          return (
            <Grid item xs={3} key={product._id}>
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
  );
};
