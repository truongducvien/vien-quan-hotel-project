import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga';

export function* mySaga() {
    yield all([ userSaga ]);
}