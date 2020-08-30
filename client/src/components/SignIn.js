import React from 'react';
import LandingHeader from './LandingHeader'
import '../styles/landingPage.css'
// import { Button, Divider } from '@material-ui/core';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';

function SignIn() {
    return (
        <>
          <ThemeProvider theme={theme}>
          <LandingHeader />
          <div className="signin_container">
            <div className="signin_title">Sign in to Zenmo</div>
            <div className="signin_box">


            </div>
          </div>

          </ThemeProvider>
        </>
    );
}
export default SignIn;
