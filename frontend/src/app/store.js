import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productslice.js';
import userReducer from '../features/user/userslice.js';
import cartReducer from '../features/cart/Cartslice.js'
import orderReducer from '../features/order/OrderSlice.js'
import adminReducer from '../features/admin/AdminSlice.js'
export const store = configureStore({
  reducer: {
    products: productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer,
  },
});