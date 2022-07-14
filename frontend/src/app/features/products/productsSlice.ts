import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface Product {
  name: string;
  price: number;
  qtyInStock: number;
  onSale: boolean;
  discount: number;
  imgUrl: string;
}

type ProductsState ={
    products: Product[],
    status: "loading" | "idle" | "success" | "fail";
}

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/productsSlice",
  async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL}/products/get`,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  products: [],
  status: "idle"
} as ProductsState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product[]>) => {
        state.products.push(...action.payload)
        state.status="idle"
    });
    builder.addCase(fetchProducts.rejected, (state) => {
        state.status = "idle";
    })
  },
});


export default productsSlice.reducer;