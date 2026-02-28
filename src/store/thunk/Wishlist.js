import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserWishlist = createAsyncThunk(
  "cart/fetchUserWishlist",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/Wishlist",
        {
          headers: {
            token: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);