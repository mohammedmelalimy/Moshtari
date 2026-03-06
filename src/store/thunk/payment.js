import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cashPayment = createAsyncThunk(
  "payment/cashPayment",async(values,thunkAPI)=>{
    try {
      const token = localStorage.getItem("token");
      const state = thunkAPI.getState();
      const cardID = state.cart.cart.cartId;
      const data = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardID}`, values,{
        headers:{token}
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  })
export const onlinePayment = createAsyncThunk(
  "payment/onlinePayment",async(values,thunkAPI)=>{
    try {
      const token = localStorage.getItem("token");
      const state = thunkAPI.getState();
      const cardID = state.cart.cart.cartId;
      const data = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardID}`, values,
        {
        headers:{token}
        },
        {
          params:{
            url:"http://localhost:5173"
          }
        });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  })