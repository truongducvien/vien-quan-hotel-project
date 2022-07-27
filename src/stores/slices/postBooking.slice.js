import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  bookingInfoState: {
    data: null,
    loading: false,
    error: null,
  },
};

const bookingSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    postBookingAction(state, action) {
      state.bookingInfoState = {
        ...state.bookingInfoState,
        loading: true,
      };
    },
    postBookingActionSuccess(state, action) {
      const bookingInfoResponse = { ...action.payload };

      state.bookingInfoState = {
        ...state.bookingInfoState,
        loading: false,
        data: bookingInfoResponse,
      };
    },
    postBookingActionFailed(state, action) {
      notification.error({
        message: `Post Failed: ${action.payload}`,
      });
    },
  },
});

export const {
  postBookingAction,
  postBookingActionSuccess,
  postBookingActionFailed,
} = bookingSlice.actions;

export const postBookingReducer = bookingSlice.reducer;
