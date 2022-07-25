import { all, fork } from "redux-saga/effects";
import { bookingSaga } from "./booking.saga";
import { postBookingSaga } from "./postBooking.saga";
import { promoCodeSaga } from "./promoCode.saga";
import { roomSaga } from "./room.saga";
import { userSaga } from "./user.saga";

export function* mySaga() {
  console.log("saga run");
  yield all([
    fork(userSaga),
    fork(roomSaga),
    fork(bookingSaga),
    fork(postBookingSaga),
    fork(promoCodeSaga),
  ]);
}
