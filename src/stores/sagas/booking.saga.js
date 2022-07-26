import { put, takeEvery } from "redux-saga/effects";
import { BookingAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
} from "../slices/booking.slice.js";
import { postBookingActionSuccess } from "../slices/postBooking.slice";

function* fetchOrder(action) {
  try {
    const response = yield BookingAPI;

    yield put(fetchBookingActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingActionFailed(e.response.data));
  }
}

export function* bookingSaga() {
  yield takeEvery(fetchBookingAction, fetchOrder);
  yield takeEvery(postBookingActionSuccess, fetchOrder);
}
