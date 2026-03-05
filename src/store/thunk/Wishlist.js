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
export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/Wishlist",
        {
          productId
        },
        {
          headers: {
            token
          },
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// export const deleteFromWishlist = createAsyncThunk(
//   "cart/deleteFromWishlist",
//   async (productId, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth.token || localStorage.getItem("token");

//       const response = await axios.delete(
//         `https://ecommerce.routemisr.com/api/v1/Wishlist/${productId}`,
//         {
//           headers: {
//             token
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );