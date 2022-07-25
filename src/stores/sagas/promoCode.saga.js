import { put, takeEvery } from "redux-saga/effects";
import { PromoCodeAPI } from "../../api/promoCode.api.js";
import {
  fetchPromoCodeAction,
  fetchPromoCodeActionFailed,
  fetchPromoCodeActionSuccess,
} from "../slices/promoCode.slice.js";

function* fetchPromoCode(action) {
  try {
    const response = yield PromoCodeAPI;
    yield put(fetchPromoCodeActionSuccess(response.data));
  } catch (e) {
    yield put(fetchPromoCodeActionFailed(e.response.data));
  }
}

export function* promoCodeSaga() {
  yield takeEvery(fetchPromoCodeAction, fetchPromoCode);
}
