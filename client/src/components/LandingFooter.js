import React from 'react';
import '../styles/landingFooter.css'
import { Divider } from '@material-ui/core';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';

function LandingFooter() {
    return (
        <>
        <div className="landing_footer_container">
          <Divider />
          <ThemeProvider theme={theme}>
            <h1>Footer Details, AppStore, Google Play</h1>
            <h5>Venmo is a service of PayPal, Inc., a licensed provider of money transfer services (NMLS ID: 910457). All money transmission is provided by PayPal, Inc. pursuant to PayPal, Inc.’s licenses. © 2020 PayPal, Inc.</h5>
          </ThemeProvider>
        </div>
        </>
    );
}
export default LandingFooter;
