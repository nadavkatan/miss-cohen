import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  Order,
  placeOrder,
  sendConfirmation,
} from "../../features/order/orderSlice";
import { emptyCart } from "../../features/cart/cartSlice";

interface PaypalCheckoutButtonProps {
  nextStep: () => void;
}

export const PaypalCheckoutButton: React.FC<PaypalCheckoutButtonProps> = ({
  nextStep,
}) => {
  const { totalPrice, cartItems } = useAppSelector((state) => state.cart);
  const { shippingData, orderNumber } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const storeOrder = () => {
    // const cartItemsIds = cartItems.map((cartItem) => cartItem._id);
    const order: Order = {
      customer_name: `${shippingData.firstName} ${shippingData.lastName}`,
      customer_address: shippingData.address,
      customer_email: shippingData.email,
      items: cartItems.map((cartItem) => cartItem._id),
      date: new Date(),
      total_price: totalPrice,
      status: "Paid",
    };

    dispatch(placeOrder(order));
  };

  useEffect(() => {
    console.log(shippingData);
  }, [shippingData]);

  const handleApprove = () => {
    //Store order in mongo
    storeOrder();
  };

  useEffect(() => {
    console.log("order number: " + orderNumber);
    if (orderNumber) {
      dispatch(
        sendConfirmation({
          customerFullName: `${shippingData.firstName} ${shippingData.lastName}`,
          customerEmail: shippingData.email,
          orderNumber: orderNumber,
          items: cartItems.map((cartItem) => cartItem.name),
          totalPrice: totalPrice,
          shippingMethod: shippingData.shippingOption,
        })
      );
      dispatch(emptyCart());
      //Move to confirmation
      nextStep();
    }
  }, [orderNumber]);

  return (
    <PayPalButtons
      fundingSource="paypal"
      onClick={(data, actions) => {
        actions.resolve();
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              //   description: product.description,
              description: "Your order at Miss. Cohen",
              amount: {
                value:
                  shippingData.shippingOption === "Delivery"
                    ? (totalPrice + 4).toString()
                    : totalPrice.toString(),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions?.order?.capture();
        console.log(order);
        handleApprove();
      }}
      onError={(err) => {
        console.error("PayPal checkout on error" + err);
      }}
      onCancel={() => {
        //display cancel message or redirect the user to cancel page or back to cart
      }}
    />
  );
};
