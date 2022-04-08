import { GET_ALL_TASK_TYPES } from '../constants/TaskTypeConst';

const initialState = {
  arrTaskTypes: [],
};

export const TaskTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPES:
      return { ...state, arrTaskTypes: action.arrTaskTypes };
    default:
      return state;
  }
};
