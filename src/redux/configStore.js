import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import reduxThunk from 'redux-thunk';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  LoadingReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;
