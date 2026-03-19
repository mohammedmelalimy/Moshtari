import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token }
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
