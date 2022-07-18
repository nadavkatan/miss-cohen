import {configureStore} from '@reduxjs/toolkit';
import productsSlice from './features/products/productsSlice';
import cartSlice from './features/cart/cartSlice';
import orderSlice from './features/order/orderSlice';
import authSlice from './features/auth/authSlice';
 
export const store = configureStore({
    reducer:{
        products: productsSlice,
        cart: cartSlice,
        order: orderSlice,
        auth:authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



