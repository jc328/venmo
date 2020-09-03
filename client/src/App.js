import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import HowZenmoWorks from './components/HowZenmoWorks.js'
import SignUpNotice from './components/SignUpNotice.js'
import DashBoard from './components/DashBoard.js'
import {  useSelector } from 'react-redux';

import { PrivateRoute } from './utilities/authUtils'


function App() {
  const needSignIn = useSelector(state => !state.authentication.token);

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/signup" exact component={SignUpNotice} />
            <Route path="/signup/email" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/" exact component={LandingPage} />
            <Route path="/about/product" exact component={HowZenmoWorks} />
            <PrivateRoute path="/dashboard" needSignIn={needSignIn} exact component={DashBoard} />
        </Switch>
        <nav>
            <ul>
                {/* <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li> */}
            </ul>
        </nav>
    </BrowserRouter>
  );
}

export default App;
