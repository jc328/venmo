import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signIn.css';
import { TextField, Button } from '@material-ui/core';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import GoogleAuth from './GoogleAuth.js'

function SignIn() {
    return (
        <>
          <ThemeProvider theme={theme}>
          <LandingHeader />
          <GoogleAuth />
          <div className="signin_outer_container">
            <div className="signin_title">Sign in to Zenmo</div>
            <div className="signin_container">
              <div className="signin_box"></div>
              <TextField
                className="signin_email"
                size="small"
                label="Email or Mobile">
                </TextField>
              <div className="signin_password_container">
                <TextField
                  className="signin_password"
                  size="small"
                  label="Password">
                </TextField>
              </div>
              <div className="signin_demo_submit">
                <div>
                <Button variant="contained" color="primary">Demo</Button>
                </div>
                <div>
                <Button variant="contained" color="primary">Sign In</Button>
                </div>
              </div>

            </div>
            <Link to="/signup" className="signin_signup_link">Sign Up</Link>

          </div>
          <LandingFooter />
          </ThemeProvider>
        </>
    );
}
export default SignIn;
