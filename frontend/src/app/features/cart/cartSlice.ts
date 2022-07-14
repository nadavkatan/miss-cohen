import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from "../products/productsSlice";

export interface CartItem extends Product {
    qty:number
}

type CartState ={
    cartItems: CartItem[],
    subtotal: number,
    vat: number,
    totalPrice: number,
};

const initialState = {
    cartItems: [],
    subtotal: 0,
    vat:0,
    totalPrice: 0,
  } as CartState;

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>) => {
            if (state.cartItems.some(item => item._id === action.payload._id)) {
                state.cartItems.map(item=>{
                    if(item._id === action.payload._id){
                        return item.qty = item.qty + 1
                    }else{
                        return item
                    }
                })
              }else{
                state.cartItems.push(action.payload);
              }
        }
    }
  });

  export default cartSlice.reducer;
  export const {addToCart} = cartSlice.actions;