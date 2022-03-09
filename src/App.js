import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingComponent from './components/Global/Loading';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs.js';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { ADD_HISTORY } from './redux/constants/HistoryConst';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history,
    });
  }, []);

  return (
    <BrowserRouter>
      <LoadingComponent />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />

        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="*" component={PageNotFound} />
        <HomeTemplate path="/home" exact Component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
