import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export type ShippingOption = "Delivery" | "Pickup" | string;

export interface ShippingData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  shippingOption: ShippingOption;
}

type OrderStatus = "Paid" | "Accepted" | "Shipped";

export interface Order {
  items: string[];
  date: Date;
  total_price: number;
  status: OrderStatus;
  customer_name: string;
  customer_email: string;
  customer_address: string;
}

interface Email {
  customerFullName: string;
  customerEmail: string;
  orderNumber: number | null;
  items: string[];
  totalPrice: number;
  shippingMethod: ShippingOption;
}

// interface InitialState extends ShippingData {}
type InitialState = {
  shippingData: ShippingData;
  status: "idle" | "loading";
  orderNumber: number | null;
};

export const placeOrder = createAsyncThunk(
  "order/orderSlice",
  async (order: Order) => {
    console.log(order);
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/orders/create`,
        data: order,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const sendConfirmation = createAsyncThunk(
  "order/orderSlice",
  async (data: Email) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/confirmation/email`,
        data: data,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: InitialState = {
  shippingData: {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    shippingOption: "Delivery",
  },
  status: "idle",
  orderNumber: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingData: (state, action: PayloadAction<ShippingData>) => {
      state.shippingData.firstName = action.payload.firstName;
      state.shippingData.lastName = action.payload.lastName;
      state.shippingData.address = action.payload.address;
      state.shippingData.email = action.payload.email;
      state.shippingData.city = action.payload.city;
      state.shippingData.zipCode = action.payload.zipCode;
      state.shippingData.phoneNumber = action.payload.phoneNumber;
      state.shippingData.shippingOption = action.payload.shippingOption;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      placeOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log("orderSlice, ", action.payload);
        state.status = "idle";
        state.orderNumber = action.payload._id;
        // state.orderNumber = action.payload.order._id;
      }
    );
    builder.addCase(placeOrder.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export default orderSlice.reducer;
export const { setShippingData } = orderSlice.actions;
