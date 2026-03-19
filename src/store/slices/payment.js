import { createSlice } from '@reduxjs/toolkit';
import { cashPayment, onlinePayment } from '../thunk/payment';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentData: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CASH PAYMENT
      .addCase(cashPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cashPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(cashPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to process payment';
      })

      // ONLINE PAYMENT
      .addCase(onlinePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onlinePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(onlinePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to process online payment';
      });
  }
});

export default paymentSlice.reducer;
