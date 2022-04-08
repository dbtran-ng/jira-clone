import { taskTypeService } from '../../services/TaskTypeService';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  GET_ALL_TASK_TYPES_SAGA,
  GET_ALL_TASK_TYPES,
} from '../constants/TaskTypeConst';
function* getAllTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() =>
      taskTypeService.getAllTaskTypes()
    );

    if (status === 200) {
      yield put({
        type: GET_ALL_TASK_TYPES,
        arrTaskTypes: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAllTaskTypesSaga() {
  yield takeLatest(GET_ALL_TASK_TYPES_SAGA, getAllTaskTypeSaga);
}
