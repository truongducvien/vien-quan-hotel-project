import { put, takeEvery } from "redux-saga/effects";
import { RoomAPI } from "../../api/room.api";
import {
  fetchRoomAction,
  fetchRoomActionFailed,
  fetchRoomActionSuccess,
} from "../slices/roomsSlice.js";

function* fetchRoom(action) {
  try {
    const response = yield RoomAPI;
    // const response = yield RoomSortAscAPI;

    yield put(fetchRoomActionSuccess(response.data));
  } catch (e) {
    yield put(fetchRoomActionFailed(e.response.data));
  }
}

export function* roomSaga() {
  yield takeEvery(fetchRoomAction, fetchRoom);
}
