import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, newCount }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
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