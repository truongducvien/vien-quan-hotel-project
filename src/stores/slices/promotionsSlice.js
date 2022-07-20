import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  promotionState: {
    data: [],
    loading: false,
    error: null,
  },
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    fetchPromotionAction(state, action) {
      state.promotionState = {
        ...state.promotionState,
        loading: true,
      };
    },
    fetchPromotionActionSuccess(state, action) {
      const promotionResponse = [...action.payload];

      state.promotionState = {
        ...state.promotionState,
        loading: false,
        data: promotionResponse,
      };
    },
    fetchPromotionActionFailed(state, action) {
      notification.error(action.payload);
    },
  },
});

export const {
  fetchPromotionAction,
  fetchPromotionActionSuccess,
  fetchPromotionActionFailed,
} = promotionSlice.actions;
export const promotionReducer = promotionSlice.reducer;
