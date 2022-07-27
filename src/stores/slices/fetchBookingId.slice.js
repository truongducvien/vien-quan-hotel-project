import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  fetchBookingIdState: {
    data: [],
    loading: false,
    error: null,
  },
};

const fetchBookingIdSlice = createSlice({
  name: "fetchBookingId",
  initialState,
  reducers: {
    fetchBookingIdAction: (state, action) => {
      state.fetchBookingIdState = {
        ...state.fetchBookingIdState,
        loading: true,
      };
    },
    fetchBookingIdActionSuccess: (state, action) => {
      const fetchBooingIdResponse = [...action.payload];

      state.fetchBookingIdState = {
        ...state.fetchBookingIdState,
        loading: false,
        data: fetchBooingIdResponse,
      };
    },
    fetchBookingIdActionFailed: (state, action) => {
      notification.error({
        message: action.payload,
      });
    },
  },
});

export const {
  fetchBookingIdAction,
  fetchBookingIdActionSuccess,
  fetchBookingIdActionFailed,
} = fetchBookingIdSlice.actions;

export const fetchBookingIdReducer = fetchBookingIdSlice.reducer;
