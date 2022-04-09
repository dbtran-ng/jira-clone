import {
  GET_PROJECT_SAGA,
  GET_ALL_PROJECTS,
} from '../constants/CyberbugsConst';

const stateDefault = {
  projectList: [],
  arrProject: [],
};

export const ProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT_SAGA:
      state.projectList = action.projectList;
      return { ...state };
    case GET_ALL_PROJECTS: {
      return { ...state, arrProject: action.projectDetails };
    }
    default:
      return { ...state };
  }
};
