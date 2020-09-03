import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signIn.css';
import { TextField, Button } from '@material-ui/core';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import GoogleAuth from './GoogleAuth.js'
import { useDispatch } from 'react-redux'
// import { signIn } from '../store/authentication.js';
import * as AuthActions from '../actions/authentication';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storeReady = await dispatch(AuthActions.signIn(email, password));
    if (storeReady) {
      history.push('/dashboard')
    }
  }

    return (
        <>
          <ThemeProvider theme={theme}>
          <LandingHeader />
          <GoogleAuth />
          <form onSubmit={handleSubmit}>
          <div className="signin_outer_container">
            <div className="signin_title">Sign in to Zenmo</div>
            <div className="signin_container">
              <div className="signin_box"></div>
              <TextField
                className="signin_email"
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email or Mobile">
                </TextField>
              <div className="signin_password_container">
                <TextField
                  className="signin_password"
                  size="small"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  label="Password">
                </TextField>
              </div>
              <div className="signin_demo_submit">
                <div>
                <Button variant="contained" color="primary">Demo</Button>
                </div>
                <div>
                <Button type="submit" variant="contained" color="primary">Sign In</Button>
                </div>
              </div>
            </div>
            <Link to="/signup" className="signin_signup_link">Sign Up</Link>
          </div>
          </form>
          <LandingFooter />
          </ThemeProvider>
        </>
    );
}
export default SignIn;
