import React from "react";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useAppSelector } from "../../hooks";

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
  const { cartItems, totalPrice, vat } = useAppSelector((state) => state.cart);
  const { shippingData } = useAppSelector((state) => state.order);

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
            <Typography variant="body2" style={{ fontWeight: 700 }}>{`€${
              item.price * item.qty
            }`}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="VAT" secondary={"21%"} />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            €{vat}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary="Shipping"
            secondary={shippingData.shippingOption}
          />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {shippingData.shippingOption === "Delivery" ? "€4.00" : "€0.00"}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {shippingData.shippingOption === "Delivery"
              ? `€${totalPrice + 4}`
              : `€${totalPrice}`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};
