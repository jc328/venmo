import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import LandingHeader from './components/LandingHeader'


function App() {

  return (
    <BrowserRouter>
        <LandingHeader />
        <Switch>
            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
            <Route path="/users">
                <UserList />
            </Route>
        </Switch>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
            </ul>
        </nav>
    </BrowserRouter>
  );
}

export default App;
