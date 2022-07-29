import { put, takeEvery } from "redux-saga/effects";
import { FetchBookingHomeAPI } from "../../api/booking.api";
import {
  fetchBookingAction,
  fetchBookingActionFailed,
  fetchBookingActionSuccess,
} from "../slices/bookingHome.slice";
import { patchBookingStatusActionSuccess } from "../slices/patchStatusBooking.slice";
import { postBookingActionSuccess } from "../slices/postBooking.slice";

function* fetchOrder(action) {
  try {
    const response = yield FetchBookingHomeAPI();

    console.log("fetchBooking again:>> ", response.data);

    yield put(fetchBookingActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingActionFailed(e.response.data));
  }
}

export function* bookingHomeSaga() {
  yield takeEvery(fetchBookingAction, fetchOrder);
  yield takeEvery(postBookingActionSuccess, fetchOrder);
  yield takeEvery(patchBookingStatusActionSuccess, fetchOrder);
}
