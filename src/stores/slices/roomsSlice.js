import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  roomState: {
    data: [],
    loading: false,
    error: null,
  },
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    fetchRoomAction(state, action) {
      state.roomState = {
        ...state.roomState,
        loading: true,
      };
    },
    fetchRoomActionSuccess(state, action) {
      const roomResponse = [...action.payload];

      state.roomState = {
        ...state.roomState,
        loading: false,
        data: roomResponse,
      };
    },
    fetchRoomActionFailed(state, action) {
      // state.roomState = {
      //   ...state.roomState,
      //   error: action.payload.error,
      // };
      notification.error(action.payload);
    },
  },
});

export const {
  fetchRoomAction,
  fetchRoomActionSuccess,
  fetchRoomActionFailed,
} = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
