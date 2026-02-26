import { createSlice } from "@reduxjs/toolkit";
import { addProductToCart } from "../thunk/addToCart";
import { fetchUserCart } from "../thunk/userCart";

const initialState = {
  cart: {}, 
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, () => {})
      
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })

      .addCase(fetchUserCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
      })

      // add to cart builder state cases 
      .addCase(addProductToCart.pending, () => {})
      
      .addCase(addProductToCart.fulfilled, (state, action) => {
        // state.cart = action.payload.data;
        console.log('added')
      })

      .addCase(addProductToCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
      });

  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;