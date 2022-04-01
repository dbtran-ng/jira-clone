import { EDIT_PROJECT, PUT_PROJECT_DETAILS } from '../constants/CyberbugsConst';

const initialState = {
  projectEdit: {
    id: 0,
    projectName: 'string',
    creator: 0,
    description: '<p>string</p>',
    categoryId: '2',
  },
  projectDetails: {},
};

export const ProjectFunctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditModel;
      console.log(state.projectEdit);
      return { ...state };
    }
    case PUT_PROJECT_DETAILS: {
      state.projectDetails = action.projectDetails;
      return { ...state };
    }
    default:
      return state;
  }
};
