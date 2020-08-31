import React from 'react';
import { Redirect } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signUpNotice.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


function SignUpNotice() {
    return (
      <>
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="signup_outer_container">
        <div className="signup_box">
          <div className="signup_title">The fun and easy way to send, spend, and receive money</div>
        </div>
          <Button
          variant="contained"
          color="primary"
          className="signup_next_button"
          onClick={() => <Redirect to={'/signup/email'} />}
          >Next</Button>

      </div>

      <LandingFooter />
      </ThemeProvider>
    </>
    );
}
export default SignUpNotice;
