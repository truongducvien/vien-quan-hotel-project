import { put, takeEvery } from "redux-saga/effects";
import { PromotionAPI } from "../../api/promotion.api.js";
import {
  fetchPromotionAction,
  fetchPromotionActionFailed,
  fetchPromotionActionSuccess,
} from "../slices/promotionsSlice.js";

function* fetchPromotion(action) {
  try {
    const response = yield PromotionAPI;
    yield put(fetchPromotionActionSuccess(response.data));
  } catch (e) {
    yield put(fetchPromotionActionFailed(e.response.data));
  }
}

export function* promotionSaga() {
  yield takeEvery(fetchPromotionAction, fetchPromotion);
}
