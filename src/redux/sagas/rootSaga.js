import { all } from 'redux-saga/effects';
import * as Cyberbugs from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga';
export function* rootSaga() {
  yield all([
    // from UserSaga
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUserSaga(),
    // from ProjectCategorySaga
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    // from ProjectSaga
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theodoiUpdateProjectSaga(),
    ProjectSaga.theodoiDeleteProjectSaga(),
  ]);
}
