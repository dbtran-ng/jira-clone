import { all } from 'redux-saga/effects';
import * as Cyberbugs from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    ProjectCategorySaga.theoDoigetAllProjectCategory,
  ]);
}
