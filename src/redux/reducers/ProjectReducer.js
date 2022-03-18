import { GET_PROJECT_SAGA } from '../constants/CyberbugsConst';

const stateDefault = {
  projectList: [],
};

export const ProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT_SAGA:
      state.projectList = action.projectList;
      return { ...state };
    default:
      return { ...state };
  }
};
