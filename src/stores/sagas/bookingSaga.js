import { put, takeEvery } from "redux-saga/effects";
import { BookingAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
  postBookingAction,
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
  const bookingPayload = action.payload;

  yield BookingAPI.post({
    userInfo: bookingPayload.userInfo,
    date: bookingPayload.date,
    nights: bookingPayload.nights,
    options: bookingPayload.options,
    payment: bookingPayload.payment,
  });
}

export function* bookingSaga() {
  yield takeEvery(fetchBookingAction, fetchOrder);
  yield takeEvery(postBookingAction, postBooking);
}
