import { all, fork } from 'redux-saga/effects'
import { roomSaga } from './roomSaga'
import { bookingSaga } from './bookingSaga'
import { usersSaga } from './usersSaga'

export default function* rootSaga () {
   yield all([fork(roomSaga), fork(bookingSaga), fork(usersSaga)])
}