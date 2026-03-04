import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/authentication";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout:(state) => {
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});
export const {setToken , logout } = authSlice.actions;
export default authSlice.reducer;