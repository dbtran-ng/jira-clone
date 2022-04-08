import { GET_ALL_PRIORITIES } from '../constants/PriorityConst';

const initialState = {
  arrPriorities: [],
};

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITIES:
      return { ...state, arrPriorities: action.arrPriorities };
    default:
      return state;
  }
};
