import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const BOOKING_INFO_KEY = "BOOKING_INFO";

const postBookingFromStorage = localStorage.getItem(BOOKING_INFO_KEY)
  ? JSON.parse(localStorage.getItem(BOOKING_INFO_KEY))
  : null;

const initialState = {
  bookingInfoState: {
    data: postBookingFromStorage,
    loading: false,
    error: null,
  },
};

const bookingSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    postBookingAction(state, action) {
      localStorage.removeItem(BOOKING_INFO_KEY);

      state.bookingInfoState = {
        ...state.bookingInfoState,
        loading: true,
      };
    },
    postBookingActionSuccess(state, action) {
      const bookingInfoResponse = { ...action.payload };
      localStorage.setItem(
        BOOKING_INFO_KEY,
        JSON.stringify(bookingInfoResponse)
      );
      state.bookingInfoState = {
        ...state.bookingInfoState,
        loading: false,
        data: bookingInfoResponse,
      };
    },
    postBookingActionFailed(state, action) {
      localStorage.removeItem(BOOKING_INFO_KEY);

      notification.error({
        message: `Post Failed: ${action.payload}`,
      });
      state.bookingInfoState = {
        ...state.bookingInfoState,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  postBookingAction,
  postBookingActionSuccess,
  postBookingActionFailed,
} = bookingSlice.actions;

export const postBookingReducer = bookingSlice.reducer;
