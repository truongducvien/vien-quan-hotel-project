import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  bookingState: {
    data: [],
    loading: false,
    error: null,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    fetchBookingAction(state, action) {
      state.bookingState = {
        ...state.bookingState,
        loading: true,
      };
    },
    fetchBookingActionSuccess(state, action) {
      const orderResponse = [...action.payload];

      state.bookingState = {
        ...state.bookingState,
        loading: false,
        data: orderResponse,
      };
    },
    fetchBookingActionFailed(state, action) {
      notification.error({
        message: action.payload,
      });
    },
  },
});

export const {
  fetchBookingAction,
  fetchBookingActionSuccess,
  fetchBookingActionFailed,
} = bookingSlice.actions;

export const bookingHomeReducer = bookingSlice.reducer;
