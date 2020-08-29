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
              {/* <h2>Venmo</h2> */}

              <Button size="small" color="primary">How Venmo Works</Button>
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
