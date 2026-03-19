import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// =========================
// 💰 Cash Payment
// =========================
export const cashPayment = createAsyncThunk('payment/cashPayment', async (values, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const state = thunkAPI.getState();
    const cartID = state.cart.cart.cartId;

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
      values,
      {
        headers: { token }
      }
    );
    console.log('Cash Payment Response:', response.data); // Debugging: Check the full response structure
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

// =========================
// 🌐 Online Payment (Stripe)
// =========================
export const onlinePayment = createAsyncThunk('payment/onlinePayment', async (values, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const state = thunkAPI.getState();
    const cartID = state.cart.cart.cartId;

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
      values, // shippingAddress
      {
        headers: { token },
        params: {
          url: 'http://localhost:5173/authUser' // redirect URL
        }
      }
    );
    console.log('Stripe Session Response:', response.data); // Debugging: Check the full response structure
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});
