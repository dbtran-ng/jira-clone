import { EDIT_PROJECT } from '../constants/CyberbugsConst';

const initialState = {
  projectEdit: {
    id: 0,
    projectName: 'string',
    creator: 0,
    description: '<p>string</p>',
    categoryId: '2',
  },
};

export const ProjectFunctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditModel;
      console.log(state.projectEdit);
      return { ...state };
    }
    default:
      return state;
  }
};
