import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/landingHeader.css'
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';



function LandingHeader(props) {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div className="landing_navbar">
              <img className="landing_logo" src={process.env.PUBLIC_URL + 'zenmo_logo_blue.svg'} alt="" />

              <Button size="small" color="primary">How Zenmo Works</Button>
              <Button size="small" color="primary">Business</Button>
              <Button size="small" color="primary">Card</Button>
              <Button size="small" color="primary">Security</Button>
              <Button size="small" color="primary">Contact Us</Button>
              <Button size="small" color="primary">Sign In</Button>

            </div>
          </ThemeProvider>
        </>
    );
}
export default LandingHeader;
