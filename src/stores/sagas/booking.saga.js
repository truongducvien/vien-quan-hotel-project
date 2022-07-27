import { delay, put, takeEvery } from "redux-saga/effects";
import { BookingAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
} from "../slices/booking.slice.js";
import { postBookingActionSuccess } from "../slices/postBooking.slice";

function* fetchOrder(action) {
  try {
    yield delay(100);
    const response = yield BookingAPI;

    console.log("fetchBooking :>> ", response.data);

    yield put(fetchBookingActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingActionFailed(e.response.data));
  }
}

export function* bookingHomeSaga() {
  yield takeEvery(fetchBookingAction, fetchOrder);
  yield takeEvery(postBookingActionSuccess, fetchOrder);
}
