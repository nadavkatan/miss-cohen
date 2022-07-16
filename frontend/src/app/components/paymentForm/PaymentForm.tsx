import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Review } from "../review/Review";
import { ShippingData } from "../../pages/checkoutPage/CheckoutPage";
import { Fab, IconButton, Typography } from "@mui/material";
import { PaypalCheckoutButton } from "../paypalChackoutButton/PaypalCheckoutButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PaymentFormProps extends ShippingData {
  nextStep: (data: ShippingData) => void;
  backStep: () => void;
  next: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  shippingOption,
  backStep,
  next,
}) => {
  useEffect(() => {
    console.log(shippingOption);
  }, [shippingOption]);
  return (
    <>
      <Review />
      <Divider />
      {shippingOption === "Delivery" ? (
        <>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ margin: "20px 0" }}
              >
                Pay with PayPal
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Button
                onClick={backStep}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
              >
                Back
              </Button>
            </Grid> */}
          </Grid>
          <PaypalCheckoutButton
            // product={product}
            // nextStep={nextStep}
            shippingOption={shippingOption}
            next={next}
            // handleEmptyCart={handleEmptyCart}
            // checkoutToken={checkoutToken}
            // orderData={orderData}
            // productsOrdered={productsOrdered}
            // getProductsAndQty={getProductsAndQty}
          />
          <Fab size="small" onClick={backStep} sx={{ marginTop: "1em" }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Fab>
        </>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ margin: "20px 0" }}
              >
                Pay at pickup
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                // onClick={placeOrder}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Place order
              </Button>
              {/* <Button
                onClick={backStep}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
              >
                Back
              </Button> */}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "1em" }}>
              <Fab size="small" onClick={backStep}>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Fab>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
