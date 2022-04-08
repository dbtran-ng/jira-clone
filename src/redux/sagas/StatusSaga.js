import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from './../constants/StatusConst';
import { statusService } from '../../services/StatusService';
function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());

    if (status === 200) {
      yield put({
        type: GET_ALL_STATUS,
        arrStatus: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
