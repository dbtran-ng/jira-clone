import { combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';

const rootReducer = combineReducers({
  LoadingReducer,
});
const store = createStore(rootReducer);

export default store;
