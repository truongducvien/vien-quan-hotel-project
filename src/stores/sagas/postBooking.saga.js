import { put, takeEvery } from "redux-saga/effects";
import {
  postBookingAction,
  postBookingActionFailed,
  postBookingActionSuccess,
} from "../slices/postBooking.slice.js";
import { PostBookingAPI } from "../../api/booking.api";

function* postBooking(action) {
  try {
    const bookingPayload = action.payload;
    // delay(300);
    const response = yield PostBookingAPI({
      userInfo: bookingPayload.userInfo,
      date: bookingPayload.date,
      nights: bookingPayload.nights,
      options: bookingPayload.options,
      payment: bookingPayload.payment,
    });
    console.log("response.data.booking", response.data);

    yield put(postBookingActionSuccess(response.data));
  } catch (error) {
    yield put(postBookingActionFailed(error.response.data));
  }
}

export function* postBookingSaga() {
  yield takeEvery(postBookingAction, postBooking);
}
