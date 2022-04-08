import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  GET_ALL_PRIORITIES,
  GET_ALL_PRIORITIES_SAGA,
} from './../constants/PriorityConst';
import { priorityService } from '../../services/PriorityService';
function* getAllPriorities(action) {
  try {
    const { data, status } = yield call(() =>
      priorityService.getAllPriorities()
    );

    if (status === 200) {
      yield put({
        type: GET_ALL_PRIORITIES,
        arrPriorities: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAllPrioritiesSaga() {
  yield takeLatest(GET_ALL_PRIORITIES_SAGA, getAllPriorities);
}
