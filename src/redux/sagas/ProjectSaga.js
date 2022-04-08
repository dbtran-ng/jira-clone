import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { cyberbugsService } from '../../services/CyberbugsService';
import { STATUS_CODE } from './../../utils/constants/settingSystem';
import {
  CREATE_PROJECT_SAGA,
  GET_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECTS_SAGA,
  GET_PROJECT_DETAILS_SAGA,
  PUT_PROJECT_DETAILS,
  CLOSE_DRAWER,
  GET_ALL_PROJECT,
} from '../constants/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { history } from '../../utils/history';
import { projectService } from '../../services/ProjectService';
import { notificationFunction } from '../../utils/Notification/NotificationCyberbugs';
function* createProjectSaga(action) {
  //HIỂN THỊ LOADING
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      history.push('./projectmanagement');
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* getListProjectSaga(action) {
  //HIỂN THỊ LOADING
  // yield put({
  //   type: DISPLAY_LOADING,
  // });

  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_SAGA,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_PROJECT_SAGA, getListProjectSaga);
}

function* updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    // yield put({
    //   type: GET_PROJECT_SAGA,
    // });
    yield call(getListProjectSaga);
    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.projectId)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      notificationFunction('success', 'Delete Project Successfully');
    } else {
      notificationFunction('error', 'Delete Project Failed');
    }

    yield call(getListProjectSaga);
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* getProjectDetailsSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetails(action.projectId)
    );

    yield put({
      type: PUT_PROJECT_DETAILS,
      projectDetails: data.content,
    });
  } catch (err) {
    console.log('404', err);
    history.push('/projectmanagement');
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiGetProjectDetailsSaga() {
  yield takeLatest(GET_PROJECT_DETAILS_SAGA, getProjectDetailsSaga);
}

function* getAllProjectsSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => projectService.getAllProject());

    yield put({
      type: GET_ALL_PROJECT,
      projectDetails: data.content,
    });
  } catch (err) {
    console.log('404', err);
    history.push('/projectmanagement');
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theodoiGetAllProjectsSaga() {
  yield takeLatest(GET_ALL_PROJECTS_SAGA, getAllProjectsSaga);
}
