import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

export const ROOM_LIMIT = 3;

const initialState = {
  roomPaginationState: {
    data: [],
    loading: false,
    error: null,
    // Thông tin phân trang
    pagination: {
      // Trang hiện tại
      page: 1,
      // Số record trả về trong 1 trang
      limit: ROOM_LIMIT,
      // Tổng số record từ server
      total: null,
      // Tổng số trang
      totalPage: null,
    },
  },
};

const roomPaginationSlice = createSlice({
  name: "roomPagination",
  initialState,
  reducers: {
    fetchRoomPaginationAction: (state, action) => {
      const { page, limit } = action.payload;

      state.roomPaginationState = {
        ...state.roomPaginationState,
        loading: true,
        pagination: {
          ...state.roomPaginationState.pagination,
          page,
          limit,
        },
      };
    },
    fetchRoomPaginationActionSuccess: (state, action) => {
      const { data, totalRoomPagination } = action.payload;

      state.roomPaginationState = {
        ...state.roomPaginationState,
        data,
        loading: false,
        pagination: {
          ...state.roomPaginationState.pagination,
          total: +totalRoomPagination,
          totalPage: totalRoomPagination / ROOM_LIMIT,
        },
      };
    },
    fetchRoomPaginationActionFailed: (state, action) => {
      notification.error(action.payload);
    },
  },
});

export const {
  fetchRoomPaginationAction,
  fetchRoomPaginationActionSuccess,
  fetchRoomPaginationActionFailed,
} = roomPaginationSlice.actions;

export const roomPaginationReducer = roomPaginationSlice.reducer;
