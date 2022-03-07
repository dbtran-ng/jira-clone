import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import LoadingComponent from './components/Global/Loading';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs.js';
import Home from './pages/Home/Home';

import PageNotFound from './pages/PageNotFound/PageNotFound';

import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';

function App() {
  return (
    <BrowserRouter>
      <LoadingComponent />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />

        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />

        <HomeTemplate exact path="/" component={Home} />
        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
