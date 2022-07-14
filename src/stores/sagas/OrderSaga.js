import { takeEvery } from "redux-saga/effects";

function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* orderSaga() {
  yield takeEvery("Order-List", helloSaga);
}
