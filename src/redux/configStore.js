import { applyMiddleware, combineReducers, createStore } from 'redux';
import { LoadingReducer } from './reducers/LoadingReducer';
import reduxThunk from 'redux-thunk';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserLoginReducer } from './reducers/UserLoginReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { ProjectFunctionReducer } from './reducers/ProjectFunctionReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  LoadingReducer,
  HistoryReducer,
  UserLoginReducer,
  ProjectCategoryReducer,
  ProjectReducer,
  DrawerReducer,
  ProjectFunctionReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;
