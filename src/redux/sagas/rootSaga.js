import { all } from 'redux-saga/effects';
import * as Cyberbugs from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga';
export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
  ]);
}
