import { delay, put, takeEvery } from "redux-saga/effects";
import { RoomSortAscAPI } from "../../api/room.api";
import {
  fetchRoomAction,
  fetchRoomActionFailed,
  fetchRoomActionSuccess,
} from "../slices/roomsSlice.js";

function* fetchRoom(action) {
  try {
    yield delay(500);
    const response = yield RoomSortAscAPI;
    yield put(fetchRoomActionSuccess(response.data));
  } catch (e) {
    yield put(fetchRoomActionFailed(e.response.data));
  }
}

export function* roomSaga() {
  yield takeEvery(fetchRoomAction, fetchRoom);
}
