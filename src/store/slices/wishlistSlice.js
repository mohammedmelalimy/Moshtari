import { createSlice } from "@reduxjs/toolkit";
import { fetchUserWishlist } from "../thunk/Wishlist";
const initialState = {
  wishlist: {}, 
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserWishlist
      .addCase(fetchUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch wishlist";
      })

      // addProductToWishlist
      // .addCase(addProductToCart.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(addProductToCart.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.wishlist = action.payload;
      // })
      // .addCase(addProductToCart.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || "Failed to add product";
      // });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;