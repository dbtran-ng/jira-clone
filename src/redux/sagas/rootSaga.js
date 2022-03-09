import { all } from 'redux-saga/effects';
import * as Cyberbugs from './UserSaga';

export function* rootSaga() {
  yield all([Cyberbugs.theoDoiSignin()]);
}
