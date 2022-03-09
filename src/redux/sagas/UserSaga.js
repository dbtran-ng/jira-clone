import Axios from 'axios';
import { call, delay, select, takeLatest, put } from 'redux-saga/effects';
import { cyberbugsService } from '../../services/CyberbugsService';
import { USER_SIGNIN_API, USLOGIN } from '../constants/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { TOKEN, USER_LOGIN } from '../../utils/constants/settingSystem';

import { history } from './../../utils/history';
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

    console.log(data);

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
