import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({email,password}, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);