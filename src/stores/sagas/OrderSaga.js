import { delay, put, takeEvery } from "redux-saga/effects";
import { OrderAPI } from "../../api/order.api";
import {
  fetchOrderAction,
  fetchOrderActionFailed,
  fetchOrderActionSuccess,
} from "../slices/ordersSlice.js";

function* fetchOrder(action) {
  try {
    const response = yield OrderAPI;
    //sort data json-server
    // const response = yield orderSortAscAPI;
    // console.log(
    //   "🚀 ~ file: orderSaga.js ~ line 13 ~ function*fetchOrder ~ response",
    //   response.data
    // );

    yield put(fetchOrderActionSuccess(response.data));
  } catch (e) {
    yield put(fetchOrderActionFailed(e.response.data));
  }
}

export function* orderSaga() {
  yield takeEvery(fetchOrderAction, fetchOrder);
}
