import { put, takeEvery } from "redux-saga/effects";
import { BookingAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
} from "../slices/bookingsSlice.js";

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
}
