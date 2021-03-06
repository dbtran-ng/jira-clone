import { call, delay, select, takeLatest, put } from 'redux-saga/effects';
import { cyberbugsService } from '../../services/CyberbugsService';
import {
  GET_USER_API,
  GET_USER_SEARCH,
  USER_SIGNIN_API,
  USLOGIN,
  ADD_USER_PROJECT_SAGA,
  GET_PROJECT_SAGA,
  REMOVE_USER_PROJECT_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from '../constants/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from '../../utils/constants/settingSystem';
import { history } from './../../utils/history';

import { userService } from './../../services/UserService';

//Quản lý các action saga

function* signinSaga(action) {
  console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push('/home');
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* getUserSaga(action) {
  //Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyword)
    );

    yield put({
      type: GET_USER_SEARCH,
      userSearchList: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetUserSaga() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

function* addUserProjectSaga(action) {
  //Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    yield put({
      type: GET_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiAddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
  //Gọi api
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );
    yield put({
      type: GET_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiRemoveUserProjectSaga() {
  yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log('action', idProject);

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log('checkdata', data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
