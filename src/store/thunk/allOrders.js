import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const getUserOrders = createAsyncThunk('orders/getUserOrders', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // Decode token to get user ID
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    return data; // This returns an array of orders
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || error.message);
  }
});
