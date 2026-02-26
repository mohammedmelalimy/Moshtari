import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCart } from "../thunk/cart";

const initialState = {
  cart:{},        // will contain FULL responses
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // add new item to the FIRST element of the api response (data.products)
      if (state.cart.length > 0) {
        state.cart[0].data.products.push(action.payload);

        // update total price
        state.cart[0].data.totalCartPrice += action.payload.price || 0;
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, () => {
        return;
      })

      .addCase(fetchUserCart.fulfilled, (state, action) => {
        // FULL RESPONSE → push into array
        state.cart = action.payload; 
      })

      .addCase(fetchUserCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
      });
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;