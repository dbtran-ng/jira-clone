import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import reduxThunk from 'redux-thunk';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserLoginReducer } from './reducers/UserLoginReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  LoadingReducer,
  HistoryReducer,
  UserLoginReducer,
  ProjectCategoryReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;
