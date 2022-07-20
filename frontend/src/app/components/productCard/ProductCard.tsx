import React, { useState, useRef, useEffect } from "react";
import { Product } from "../../features/products/productsSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../../features/cart/cartSlice";
import { useAppSelector, useAppDispatch, useInView } from "../../hooks";
import { CartItemModel } from "../../features/cart/cartSlice";
import "./styles/productCard.css";
import { Box, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { DiscountTag } from "../discountTag/DiscountTag";
import { useLocation } from "react-router-dom";

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
  const cardEl = useRef(null);
  const isInView = useInView(cardEl);
  const location = useLocation();
  const path = location.pathname;

  const handleAddToCart = (product: CartItemModel) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    // console.log("isInView", isInView);
  }, [isInView]);

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className={
        isInView && path === "/"
          ? "product-card card-animation"
          : "product-card"
      }
      ref={cardEl}
    >
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
      {onSale && <DiscountTag discount={discount} />}
      <CardContent
        style={{ textAlign: "center" }}
        className="product-card-content"
      >
        <Box className="product-card-product-name">
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Box className="product-card-price-container">
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                textAlign: "left",
                textDecoration: onSale ? "line-through" : "none",
                marginRight: ".7em",
              }}
            >
              €{price.toFixed(2)}
            </Typography>
            {onSale && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                }}
              >
                €{(price - price * (discount / 100)).toFixed(2)}
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <IconButton
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
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
