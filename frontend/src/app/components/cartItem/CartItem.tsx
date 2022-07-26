import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { CartItemModel } from "../../features/cart/cartSlice";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch } from "../../hooks";
import { Anchor } from "../cart/Cart";
import "./styles/cartItem.css";

interface CartItemProps extends CartItemModel {}

export const CartItem: React.FC<CartItemProps> = ({
  imgUrl,
  name,
  price,
  qty,
  discount,
  qtyInStock,
  _id,
  onSale,
}) => {
  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(
      addToCart({
        imgUrl,
        name,
        price,
        qty,
        discount,
        qtyInStock,
        _id,
        onSale,
      })
    );
  };

  const handleRemoveItem = () => {
    dispatch(
      removeFromCart({
        imgUrl,
        name,
        price,
        qty,
        discount,
        qtyInStock,
        _id,
        onSale,
      })
    );
  };

  return (
    <Grid container className="cart-item">
      <Grid item xs={9} className="cart-item-left">
        <img src={imgUrl} alt="cart-item" className="cart-item-img" />
        <div className="cart-item-name-qty">
          <Typography variant="subtitle2">{name}</Typography>
          <div className="cart-item-qty">
            <Typography variant="subtitle2">{qty}</Typography>
            <div className="modify-cart-qty">
              <IconButton onClick={handleRemoveItem} name="modify-qty">
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddItem} name="modify-qty">
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={3} className="cart-item-right">
        <Typography variant="subtitle2">
          €{onSale ? price - price * (discount / 100) : price}
        </Typography>
      </Grid>
    </Grid>
  );
};
