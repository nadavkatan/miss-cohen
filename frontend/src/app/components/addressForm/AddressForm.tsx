import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useForm, FormProvider, Resolver } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { ShippingData, setShippingData } from "../../features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface AddressFormProps {
  nextStep: () => void;
  backStep: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  nextStep,
  backStep,
}) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [disable, setDisable] = useState(false);
  const dispatch = useAppDispatch();

  const methods = useForm();
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ShippingData>({
    defaultValues: {
      firstName: currentUser ? currentUser.firstName : "",
      lastName: currentUser ? currentUser.lastName : "",
    },
  });

  // const values = getValues();

  useEffect(() => {
    const subscription = watch((data) => {
      data.shippingOption === "Delivery" ? setDisable(false) : setDisable(true);
      // console.log(values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: ShippingData) => {
    dispatch(setShippingData(data));
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel>First name</InputLabel>
            <TextField
              fullWidth
              id="firstName"
              defaultValue={currentUser ? currentUser.firstName : ""}
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Last Name</InputLabel>
            <TextField
              fullWidth
              defaultValue={currentUser ? currentUser.lastName : ""}
              id="lastName"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Address</InputLabel>
            <TextField
              fullWidth
              disabled={disable}
              {...register("address", { required: !disable })}
              id="address1"
            />
            {errors.address && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Email</InputLabel>
            <TextField
              fullWidth
              defaultValue={currentUser ? currentUser.email : ""}
              {...register("email", {
                required: "Please fill in your email",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <Typography variant="subtitle2" color="error">
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>City</InputLabel>
            <TextField
              fullWidth
              {...register("city", { required: !disable })}
              disabled={disable}
            />
            {errors.city && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>ZIP / Postal Code</InputLabel>
            <TextField
              fullWidth
              disabled={disable}
              {...register("zipCode", { required: !disable })}
            />
            {errors.zipCode && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Phone number</InputLabel>
            <TextField
              fullWidth
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <Typography variant="subtitle2" color="error">
                This field is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              defaultValue="Delivery"
              fullWidth
              {...register("shippingOption", { required: true })}
            >
              <MenuItem key="Delivery" value="Delivery">
                Delivery - (€4.00)
              </MenuItem>
              <MenuItem key="Pickup" value="Pickup">
                Pickup - (€0.00)
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            onClick={() => backStep()}
          >
            Back to Cart
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </Box>
    </FormProvider>
  );
};
