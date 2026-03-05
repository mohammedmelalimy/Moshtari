import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import paymentSlice from "./slices/payment";
import themeSlice from "./slices/themeSlice";
import wishlistSlice from "./slices/wishlistSlice";
const store = configureStore({
  reducer:{
    auth: authSlice,
    theme: themeSlice,
    cart: cartReducer,
    wishlist: wishlistSlice,
    payment: paymentSlice,
  },
})
export default store