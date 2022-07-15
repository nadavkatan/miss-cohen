import React, { useState } from "react";
import { Product } from "../../features/products/productsSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../../features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { CartItemModel } from "../../features/cart/cartSlice";
import "./styles/productCard.css";

interface ProductProps extends Product {}

export const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  qtyInStock,
  onSale,
  discount,
  _id,
  imgUrl,
}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartItemModel) => {
    dispatch(addToCart(product));
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="product-card">
      <CardMedia
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        component="img"
        height="270"
        image={imgUrl}
        alt="product-img"
        style={{ opacity: isHovered ? ".7" : "1", transition: ".3s" }}
      />
      {qtyInStock !== 0 ? (
        <Button
          onClick={() =>
            handleAddToCart({
              name,
              price,
              qtyInStock,
              onSale,
              discount,
              _id,
              imgUrl,
              qty: 1,
            })
          }
          variant="contained"
          style={{ opacity: isHovered ? 1 : 0 }}
          onMouseOut={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
          className="add-to-cart-btn"
        >
          Add To Cart
        </Button>
      ) : (
        <Button variant="contained" className="add-to-cart-btn">
          Out of Stock
        </Button>
      )}

      <CardContent style={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          €{price}
        </Typography>
      </CardContent>
    </Card>
  );
};
