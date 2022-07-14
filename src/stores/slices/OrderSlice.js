import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  order: [
    {
      date: {
        startDay: moment(new Date()).format("ddd, DD MMM YY"),
        endDay: moment(
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        ).format("ddd, DD MMM YY"),
      },
      nights: 1,
      roomNum: 1,
      options: [],
    },
  ],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.order = [...action.payload];
    },
  },
});

export const { updateOrder } = OrderSlice.actions;

export const OrderReducer = OrderSlice.reducer;
