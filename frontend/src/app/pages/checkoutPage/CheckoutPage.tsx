import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Step, StepLabel } from "@mui/material";

interface CheckoutPageProps {}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps: string[] = ["Shipping Address", "Payment Details"];

  return (
    <main>
      <Paper>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </main>
  );
};
