import { put, takeEvery, delay } from "redux-saga/effects";
import { FetchBookingIdAPI } from "../../api/fecthBookingId.api";
import {
  fetchBookingIdAction,
  fetchBookingIdActionFailed,
  fetchBookingIdActionSuccess,
} from "../slices/fetchBookingId.slice";

function* fetchBookingId(action) {
  try {
    yield delay(100);
    const id = action.payload;
    const response = yield FetchBookingIdAPI.fetchBookingId(id);

    console.log("fetchBookingIdData", response.data);
    yield put(fetchBookingIdActionSuccess(response.data));
  } catch (e) {
    yield put(fetchBookingIdActionFailed(e.response.data));
  }
}

export function* fetchBookingIdSaga() {
  yield takeEvery(fetchBookingIdAction, fetchBookingId);
}
