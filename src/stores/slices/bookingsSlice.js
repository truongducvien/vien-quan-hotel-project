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
      notification.error(action.payload);
    },

    postBookingAction(state, action) {
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
  },
});

export const {
  fetchBookingAction,
  fetchBookingActionSuccess,
  fetchBookingActionFailed,
  postBookingAction,
} = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
