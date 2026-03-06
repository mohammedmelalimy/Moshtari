import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteFromWishlist, fetchUserWishlist } from "../thunk/Wishlist";

const initialState = {
  wishlist: [], // array of items
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data || []; // ensure array
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add To Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // If API returns full list:
        state.wishlist = [...state.wishlist, action.payload.data];
        // state.wishlist.push(action.payload.data);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete From Wishlist
      .addCase(deleteFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // If API returns full updated wishlist:
        // state.wishlist = action.payload.data || state.wishlist;
        // Or, if API returns productId only:
        state.wishlist = state.wishlist.filter(item => item._id !== action.payload.productId);
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;