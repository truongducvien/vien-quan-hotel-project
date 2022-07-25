import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  promoCodeState: {
    data: [],
    loading: false,
    error: null,
  },
};

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    fetchPromoCodeAction(state, action) {
      state.promoCodeState = {
        ...state.promoCodeState,
        loading: true,
      };
    },
    fetchPromoCodeActionSuccess(state, action) {
      const promoCodeResponse = [...action.payload];

      state.promoCodeState = {
        ...state.promoCodeState,
        loading: false,
        data: promoCodeResponse,
      };
    },
    fetchPromoCodeActionFailed(state, action) {
      notification.error(action.payload);
    },
  },
});

export const {
  fetchPromoCodeAction,
  fetchPromoCodeActionSuccess,
  fetchPromoCodeActionFailed,
} = promoCodeSlice.actions;
export const promoCodeReducer = promoCodeSlice.reducer;
