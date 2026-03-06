import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token }
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: { token }
        }
      );
       // fetch wishlist again
        thunkAPI.dispatch(fetchUserWishlist());
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token }
        }
      );
       // fetch wishlist again
        thunkAPI.dispatch(fetchUserWishlist());
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);