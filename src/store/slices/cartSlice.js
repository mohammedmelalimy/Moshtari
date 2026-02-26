import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCart } from "../thunk/userCart";

const initialState = {
  cart: {}, 
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (state.cart?.data) {
        state.cart.data.products.push(action.payload);
        state.cart.data.totalCartPrice += action.payload.price || 0;
      }
    },
    clearCart(state) {
      state.cart = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, () => {})
      
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(fetchUserCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
      });
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;