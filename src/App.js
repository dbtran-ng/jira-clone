import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingComponent from './components/Global/Loading';
import LoginCyberbugs from './pages/CyberBugs/LoginCyberBugs.js';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { ADD_HISTORY } from './redux/constants/HistoryConst';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';

import CreateProject from './pages/CyberBugs/CreateProject';
import IndexCyberbugs from './components/Cyberbugs/IndexCyberbugs';
import ProjectManagement from './pages/CyberBugs/ProjectManagement';
import DrawerCyberBugs from './HOC/DrawerCyberbugs';
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
      <DrawerCyberBugs />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberbugs} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberbugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetails/:projectId"
          Component={IndexCyberbugs}
        />

        <CyberbugsTemplate path="/" Component={ProjectManagement} />
        <CyberbugsTemplate path="*" Component={PageNotFound} />
        <CyberbugsTemplate path="/home" Component={ProjectManagement} />
      </Switch>
    </>
  );
}

export default App;
