import { all } from 'redux-saga/effects';
import * as UserSaga from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga';
import * as TaskTypeSaga from './TaskTypeSaga';
import * as TaskSaga from './TaskSaga';
import * as PrioritySaga from './PrioritySaga';
import * as StatusSaga from './StatusSaga';
import { getAllTaskTypesSaga } from './TaskTypeSaga';
export function* rootSaga() {
  yield all([
    // from UserSaga
    UserSaga.theoDoiSignin(),
    UserSaga.theoDoiGetUserSaga(),
    UserSaga.theoDoiAddUserProjectSaga(),
    UserSaga.theoDoiRemoveUserProjectSaga(),
    UserSaga.theoDoiGetUserByProjectIdSaga(),
    // from ProjectCategorySaga
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    // from ProjectSaga
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theodoiUpdateProjectSaga(),
    ProjectSaga.theodoiDeleteProjectSaga(),
    ProjectSaga.theodoiGetProjectDetailsSaga(),
    ProjectSaga.theodoiGetAllProjectsSaga(),
    TaskTypeSaga.getAllTaskTypesSaga(),
    PrioritySaga.getAllPrioritiesSaga(),
    StatusSaga.getAllStatusSaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
  ]);
}
