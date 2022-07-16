import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  orderState: {
    data: [],
    loading: false,
    error: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrderAction(state, action) {
      state.orderState = {
        ...state.orderState,
        loading: true,
      };
    },
    fetchOrderActionSuccess(state, action) {
      const orderResponse = [...action.payload];

      state.orderState = {
        ...state.orderState,
        loading: false,
        data: orderResponse,
      };
    },
    fetchOrderActionFailed(state, action) {
      // state.orderState = {
      //   ...state.orderState,
      //   error: action.payload.error,
      // };
      notification.error(action.payload);
    },
  },
});

export const {
  fetchOrderAction,
  fetchOrderActionSuccess,
  fetchOrderActionFailed,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
