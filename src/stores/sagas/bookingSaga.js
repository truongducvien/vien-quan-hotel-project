import { put, takeEvery } from "redux-saga/effects";
import { BookingAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
  postBookingAction,
  postBookingActionFailed,
  postBookingActionSuccess,
} from "../slices/bookingsSlice.js";

function* fetchOrder(action) {
  try {
    const response = yield BookingAPI.getBooking;

    yield put(fetchBookingActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingActionFailed(e.response.data));
  }
}
function* postBooking(action) {
  try {
    const bookingPayload = action.payload;
    const response = yield BookingAPI.post({
      userInfo: bookingPayload.userInfo,
      date: bookingPayload.date,
      nights: bookingPayload.nights,
      options: bookingPayload.options,
      payment: bookingPayload.payment,
    });

    yield put(postBookingActionSuccess(response.data.booking));
  } catch (error) {
    yield put(postBookingActionFailed(error.response.data));
  }
}

export function* bookingSaga() {
  yield takeEvery(fetchBookingAction, fetchOrder);
  yield takeEvery(postBookingAction, postBooking);
}
