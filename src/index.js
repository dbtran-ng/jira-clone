import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//setup redux
import store from './redux/configStore';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { BrowserRouter, Router } from 'react-router-dom';
import { history } from './utils/history';
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
