import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteFromWishlist, fetchUserWishlist } from "../thunk/Wishlist";
const initialState = {
  wishlist: {}, 
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = {};
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

      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add product";
      })
      // deleteFromWishlist
      .addCase(deleteFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product";
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;