import React from 'react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signUp.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';


function SignUp() {
    return (
      <>
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="signup_outer_container">
        <div className="signup_title">Create your account</div>
        <div className="signup_container">
          <div className="signup_box"></div>
        </div>
      </div>
      <LandingFooter />
      </ThemeProvider>
    </>
    );
}
export default SignUp;
