import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../../hooks";
import { CartItem } from "../cartItem/CartItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import "./styles/cart.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export type Anchor = "right";

export default function Cart() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { cartItems, subtotal, vat, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleCheckout = () => {
    setState({ right: false });
    // toggleDrawer("right", false);
    navigate("/checkout-signin");
  };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {cartItems.length ? (
        <List>
          <ListItem>
            <ListItemButton onClick={toggleDrawer("right", false)}>
              <ListItemIcon>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText primary="Continue shopping" />
            </ListItemButton>
          </ListItem>
          {cartItems.map((cartItem) => {
            return (
              <ListItem key={cartItem._id}>
                <CartItem
                  qty={cartItem.qty}
                  name={cartItem.name}
                  price={cartItem.price}
                  imgUrl={cartItem.imgUrl}
                  _id={cartItem._id}
                  qtyInStock={cartItem.qtyInStock}
                  onSale={cartItem.onSale}
                  discount={cartItem.discount}
                />
              </ListItem>
            );
          })}
          <Divider />
          <ListItem>
            <Grid container>
              <Grid item xs={9}>
                <ListItemText primary="Subtotal" />
              </Grid>
              <Grid item xs={3}>
                €{subtotal}
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={9}>
                <ListItemText primary="VAT" />
              </Grid>
              <Grid item xs={3}>
                €{vat}
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={9}>
                <ListItemText primary="Total" />
              </Grid>
              <Grid item xs={3}>
                €{totalPrice}
              </Grid>
            </Grid>
          </ListItem>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <Typography variant="body1">Your cart is empty</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" onClick={toggleDrawer("right", false)}>
              Start shopping!
            </Typography>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            color="inherit"
            size="large"
            onClick={toggleDrawer(anchor, true)}
          >
            {cartItems.length ? (
              <Badge
                badgeContent={cartItems.reduce(
                  (total, items) => total + items.qty,
                  0
                )}
                color="error"
              >
                <ShoppingBasketIcon color="primary" />
              </Badge>
            ) : (
              <ShoppingBasketIcon />
            )}
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
