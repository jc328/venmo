import React from 'react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/landingPage.css';
import { Button } from '@material-ui/core';
import theme from '../styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';

function LandingPage() {
    return (
        <>
          <ThemeProvider theme={theme}>
          <LandingHeader />
          <div className="landing_body">
            <div className="landing_body_images">
                <img className="landing_iphone" src={process.env.PUBLIC_URL + 'nexus.png'} alt="" />
                <img className="landing_iphone" src={process.env.PUBLIC_URL + 'iphone6.png'} alt="" />
            </div>

            <div className="landing_body_text">
              <h1>Send money and make purchases at approved merchants</h1>
              <Button variant="contained" color="primary" style={{width: '100%', marginTop: '20px'}}>Sign Up Now</Button>
            </div>
          </div>
          <LandingFooter />
          </ThemeProvider>
        </>
    );
}
export default LandingPage;
