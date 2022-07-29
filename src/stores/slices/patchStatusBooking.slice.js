import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  patchBookingStatusState: {
    data: null,
    loading: false,
    error: null,
  },
};

const patchBookingStatusSlice = createSlice({
  name: "patchBookingStatus",
  initialState,
  reducers: {
    patchBookingStatusAction(state, action) {
      state.patchBookingStatusState = {
        ...state.patchBookingStatusState,
        loading: true,
      };
    },
    patchBookingStatusActionSuccess(state, action) {
      const statusBookingResponse = { ...action.payload };

      state.patchBookingStatusState = {
        ...state.patchBookingStatusState,
        loading: false,
        data: statusBookingResponse,
      };
    },
    patchBookingStatusActionFailed(state, action) {
      notification.error({
        message: `Post Failed: ${action.payload}`,
      });
    },
  },
});

export const {
  patchBookingStatusAction,
  patchBookingStatusActionSuccess,
  patchBookingStatusActionFailed,
} = patchBookingStatusSlice.actions;

export const patchBookingStatusReducer = patchBookingStatusSlice.reducer;
