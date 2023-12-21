import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './authSlice';
import cartReducer from "./cartSlice.js";
import productReducer  from "./ProductSlice.js"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
    }
})

export default store;