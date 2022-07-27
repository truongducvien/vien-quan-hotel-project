import { put, takeEvery } from "redux-saga/effects";
import { RoomSortAscAPI } from "../../api/room.api";
import {
  fetchRoomAction,
  fetchRoomActionFailed,
  fetchRoomActionSuccess,
} from "../slices/room.slice.js";

function* fetchRoom(action) {
  try {
    const response = yield RoomSortAscAPI;
    yield put(fetchRoomActionSuccess(response.data));
  } catch (e) {
    yield put(fetchRoomActionFailed(e.response.data));
  }
}

export function* roomHomeSaga() {
  yield takeEvery(fetchRoomAction, fetchRoom);
}
