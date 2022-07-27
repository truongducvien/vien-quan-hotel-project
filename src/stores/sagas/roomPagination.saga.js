import { put, takeEvery, delay } from "redux-saga/effects";
import { RoomPaginationAPI } from "../../api/roomPagination.api";
import {
  fetchRoomPaginationAction,
  fetchRoomPaginationActionFailed,
  fetchRoomPaginationActionSuccess,
} from "../slices/roomPagination.slice";

function* fetchRoomPagination(action) {
  try {
    yield delay(100);
    const { page, limit } = action.payload;
    const response = yield RoomPaginationAPI.fetchRoomPagination(page, limit);
    const RoomPaginationData = response.data;
    const totalRoomPagination = response.headers["x-total-count"];

    // Put 1 action đã được định nghĩa ở slice
    yield put(
      fetchRoomPaginationActionSuccess({
        data: RoomPaginationData,
        totalRoomPagination: totalRoomPagination,
      })
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    yield put(fetchRoomPaginationActionFailed(e.response.data));
  }
}

export function* RoomPaginationSaga() {
  yield takeEvery(fetchRoomPaginationAction, fetchRoomPagination);
}
