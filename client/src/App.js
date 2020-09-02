import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import HowZenmoWorks from './components/HowZenmoWorks.js'
import SignUpNotice from './components/SignUpNotice.js'
import DashBoard from './components/DashBoard.js'


function App() {

  // const [loaded, setLoaded] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoaded(true);
  //   dispatch(loadToken());
  // }, [dispatch]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/signup" exact component={SignUpNotice} />
            <Route path="/signup/email" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/" exact component={LandingPage} />
            <Route path="/about/product" exact component={HowZenmoWorks} />
            <Route path="/dashboard" exact component={DashBoard} />
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
