import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector } from "../../hooks";
import { ShippingOption } from "../../pages/checkoutPage/CheckoutPage";

interface PaypalCheckoutButtonProps {
  shippingOption: ShippingOption;
  next: () => void;
}

export const PaypalCheckoutButton: React.FC<PaypalCheckoutButtonProps> = ({
  shippingOption,
  next,
}) => {
  const { totalPrice } = useAppSelector((state) => state.cart);
  const [error, setError] = useState<any>(null);
  const [paid, setPaid] = useState(false);

  //   useEffect(() => {
  //     if(paid)
  //   })

  const handleApprove = () => {
    //Store order in mongo and send email to client and seller
    next();
  };

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
                  shippingOption === "Delivery"
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
        setError(err);
        console.error("PayPal checkout on error" + err);
      }}
      onCancel={() => {
        //display cancel message or redirect the user to cancel page or back to cart
      }}
    />
  );
};
