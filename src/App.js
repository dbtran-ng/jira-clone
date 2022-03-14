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
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';

import CreateProject from './pages/CyberBugs/CreateProject';
import IndexCyberBugs from './components/Cyberbugs/IndexCyberbugs';
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
    <>
      <LoadingComponent />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <HomeTemplate path="/" Component={Home} />
        <HomeTemplate path="*" Component={PageNotFound} />
        <HomeTemplate path="/home" Component={Home} />
      </Switch>
    </>
  );
}

export default App;
