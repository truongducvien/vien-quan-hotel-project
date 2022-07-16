import { delay, put, takeEvery } from "redux-saga/effects";
import { RoomAPI, RoomSortAscAPI } from "../../api/room.api";
import {
  fetchRoomAction,
  fetchRoomActionFailed,
  fetchRoomActionSuccess,
} from "../slices/roomsSlice.js";

function* fetchRoom(action) {
  try {
    yield delay(500);
    const response = yield RoomAPI;
    //sort data json-server
    // const response = yield RoomSortAscAPI;
    // console.log(
    //   "🚀 ~ file: roomSaga.js ~ line 13 ~ function*fetchRoom ~ response",
    //   response.data
    // );

    yield put(fetchRoomActionSuccess(response.data));
  } catch (e) {
    yield put(fetchRoomActionFailed(e.response.data));
  }
}

export function* roomSaga() {
  yield takeEvery(fetchRoomAction, fetchRoom);
}
