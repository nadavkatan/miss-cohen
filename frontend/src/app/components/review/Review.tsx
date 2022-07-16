import React from "react";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useAppSelector } from "../../hooks";

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem style={{ padding: "10px 0" }} key={item.name}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.qty}`}
            />
            <Typography variant="body2">{`€${
              item.price * item.qty
            }`}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Shipping" secondary={"Nadav-insert-method"} />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {/* {orderData.shippingOption === "Delivery"? "$4.00" : "$0.00" }</Typography> */}
            conditional rendering for shipping price
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {/* {orderData.shippingOption === "Delivery"? `$${checkoutToken.live.subtotal.raw + 4}.00`:checkoutToken.live.subtotal.formatted_with_symbol}</Typography> */}
            €{totalPrice}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};
