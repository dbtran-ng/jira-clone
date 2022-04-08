import { call, put, takeLatest } from 'redux-saga/effects';
import { taskService } from '../../services/TaskService';
import { STATUS_CODE } from '../../utils/constants/settingSystem';
import { notificationFunction } from '../../utils/Notification/NotificationCyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

import { CREATE_TASK_SAGA } from './../constants/TaskConst';
function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: 'CLOSE_DRAWER',
    });
    notificationFunction('success', 'Create task successfully !');
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
