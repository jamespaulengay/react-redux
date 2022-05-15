import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsVisible: true, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        title: action.payload.title,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
  },
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;
