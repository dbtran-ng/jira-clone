import React from 'react';
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
} from '../constants/CyberbugsConst';

const initialState = {
  visible: false,
  componentContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
    alert('click demo!');
  },
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_FORM_EDIT_PROJECT:
      state.visible = true;
      state.componentContentDrawer = action.componentContentDrawer;
      return { ...state };
    case SET_SUBMIT_EDIT_PROJECT:
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    default:
      return state;
  }
};
