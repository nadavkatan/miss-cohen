import {configureStore} from '@reduxjs/toolkit';
import productsSlice from './features/products/productsSlice';
import cartSlice from './features/cart/cartSlice';
import orderSlice from './features/order/orderSlice';
 
export const store = configureStore({
    reducer:{
        products: productsSlice,
        cart: cartSlice,
        order: orderSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



