import React from 'react';
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
  OPEN_FORM_CREATE_TASK,
  SET_SUBMIT_CREATE_TASK,
} from '../constants/CyberbugsConst';

const initialState = {
  visible: false,
  title: '',
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
      state.title = action.title;
      return { ...state };
    case SET_SUBMIT_EDIT_PROJECT:
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    case SET_SUBMIT_CREATE_TASK:
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    case OPEN_FORM_CREATE_TASK:
      state.visible = true;
      state.title = action.title;
      state.componentContentDrawer = action.componentContentDrawer;
      return { ...state };
    default:
      return state;
  }
};
