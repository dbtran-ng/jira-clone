import { CREATE_TASK } from '../constants/TaskConst';

const initialState = {
  arrTaskTypes: [],
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, arrTaskTypes: action.arrTaskTypes };
    default:
      return state;
  }
};
