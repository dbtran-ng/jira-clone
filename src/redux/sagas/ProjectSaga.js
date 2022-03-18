import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { cyberbugsService } from '../../services/CyberbugsService';
import { STATUS_CODE } from './../../utils/constants/settingSystem';
import { CREATE_PROJECT_SAGA } from '../constants/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

function* createProjectSaga(action) {
  console.log('actionCreateProject', action);
  yield put({
    display: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
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