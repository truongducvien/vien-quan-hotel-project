import { put, takeEvery, delay } from "redux-saga/effects";
import { FetchBookingIdAPI } from "../../api/booking.api";
import {
  fetchBookingIdAction,
  fetchBookingIdActionFailed,
  fetchBookingIdActionSuccess,
} from "../slices/fetchBookingId.slice";
import { patchBookingStatusActionSuccess } from "../slices/patchStatusBooking.slice";

function* fetchBookingId(action) {
  try {
    const id = action.payload;
    const response = yield FetchBookingIdAPI(id);

    console.log("fetchBookingIdData", response.data);
    yield put(fetchBookingIdActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingIdActionFailed(e.response.data));
  }
}

export function* fetchBookingIdSaga() {
  yield takeEvery(fetchBookingIdAction, fetchBookingId);
  yield takeEvery(patchBookingStatusActionSuccess, fetchBookingId);
}
