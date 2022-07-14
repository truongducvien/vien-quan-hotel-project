import { all, fork } from "redux-saga/effects";
import { roomSaga } from "./roomSaga";
import { userSaga } from "./UserSaga";

export function* mySaga() {
  console.log("saga run");
  yield all([fork(userSaga), fork(roomSaga)]);
}