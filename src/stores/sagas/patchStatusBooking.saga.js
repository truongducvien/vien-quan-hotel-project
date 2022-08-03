import { put, takeEvery } from "redux-saga/effects";
import { PatchBookingStatusAPI } from "../../api/booking.api";
import {
  patchBookingStatusAction,
  patchBookingStatusActionFailed,
  patchBookingStatusActionSuccess,
} from "../slices/patchStatusBooking.slice";

function* patchBookingStatus(action) {
  try {
    const bookingPayload = action.payload;

    const response = yield PatchBookingStatusAPI(bookingPayload.id, {
      status: "Cancel",
    });

    yield put(patchBookingStatusActionSuccess(response.data));
  } catch (error) {
    yield put(patchBookingStatusActionFailed(error.response.data));
  }
}

export function* patchBookingStatusSaga() {
  yield takeEvery(patchBookingStatusAction, patchBookingStatus);
}
