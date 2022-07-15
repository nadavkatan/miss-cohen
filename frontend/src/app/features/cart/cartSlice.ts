import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from "../products/productsSlice";
import { current } from '@reduxjs/toolkit'


export interface CartItemModel extends Product {
    qty:number
}

type CartState ={
    cartItems: CartItemModel[],
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
        addToCart: (state, action: PayloadAction<CartItemModel>) => {
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
              state.subtotal += action.payload.price;
              state.vat = Number((state.subtotal * 0.21).toFixed(2));
              state.totalPrice = Number((state.subtotal + state.vat).toFixed(2));
        },
        removeFromCart: (state, action: PayloadAction<CartItemModel>) => {
            const itemInCart = state.cartItems.find(item => item._id === action.payload._id);
            if(itemInCart?.qty === 1){
                state.cartItems.splice(state.cartItems.indexOf(itemInCart), 1);
            }else{
                state.cartItems.map(item=>{
                    if(item._id === action.payload._id){
                        return item.qty = item.qty - 1
                    }else{
                        return item
                    }
                })
            }
            state.subtotal -= action.payload.price;
            state.vat = Number((state.subtotal * 0.21).toFixed(2));
            state.totalPrice = Number((state.subtotal + state.vat).toFixed(2));
        }
    }
  });

  export default cartSlice.reducer;
  export const {addToCart, removeFromCart} = cartSlice.actions;