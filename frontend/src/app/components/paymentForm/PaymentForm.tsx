import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Review } from "../review/Review";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { PaypalCheckoutButton } from "../paypalChackoutButton/PaypalCheckoutButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../../hooks";

interface PaymentFormProps {
  nextStep: () => void;
  backStep: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  backStep,
  nextStep,
}) => {
  const { shippingData } = useAppSelector((state) => state.order);

  // useEffect(() => {
  //   console.log(shippingData.shippingOption);
  // }, [shippingData.shippingOption]);

  return (
    <>
      <Review />
      <Divider />
      {shippingData.shippingOption === "Delivery" ? (
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
          </Grid>
          {/* <Box
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          > */}
          <PaypalCheckoutButton nextStep={nextStep} />
          {/* </Box> */}
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
