import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddressForm } from "../../components/addressForm/AddressForm";
import { PaymentForm } from "../../components/paymentForm/PaymentForm";
import { Confirmation } from "../../components/confirmation/Confirmation";
import { ShippingData, setShippingData } from "../../features/order/orderSlice";
import { useAppSelector } from "../../hooks";
import "./styles/checkoutPage.css";

interface CheckoutPageProps {}

// export type ShippingOption = "Delivery" | "Pickup" | string;

// export interface ShippingData {
//   firstName: string;
//   lastName: string;
//   address: string;
//   email: string;
//   city: string;
//   zipCode: string;
//   phoneNumber: string;
//   shippingOption: ShippingOption;
// }

export const CheckoutPage: React.FC<CheckoutPageProps> = ({}) => {
  const { shippingData } = useAppSelector((state) => state.order);
  const [activeStep, setActiveStep] = useState(0);

  const steps: string[] = [
    "Shipping Address",
    "Payment Details",
    "Confirmation",
  ];

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    console.log(shippingData);
  }, [shippingData]);

  return (
    <main className="checkout-wrapper">
      <Paper elevation={3} className="checkout-container">
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className="checkout-stepper">
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? (
          <AddressForm nextStep={nextStep} backStep={backStep} />
        ) : activeStep === 1 ? (
          <PaymentForm backStep={backStep} nextStep={nextStep} />
        ) : (
          <Confirmation />
        )}
      </Paper>
    </main>
  );
};
