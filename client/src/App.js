import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'


function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/" exact component={LandingPage} />
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
