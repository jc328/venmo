import React from 'react';
import '../styles/landingFooter.css'
import { Divider } from '@material-ui/core';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';

function LandingFooter() {
    return (
        <>
        <Divider style={{marginTop: '50px'}}/>
        <div className="landing_footer_outer">

          <ThemeProvider theme={theme}>
          <div className="landing_footer_container">

            <div className="footer_container">
              <div className="footer_text">
                <p>Learn More</p>
                <p>How it Works</p>
                <p>Contact Us</p>
              </div>
              <div className="footer_text">
                <p>Company</p>
                <p>Our Team</p>
                <p>Jobs</p>
              </div>
              <div className="footer_text">
                <p>Community</p>
                <p>Blog</p>
                <p>Help Center</p>
              </div>
              <div className="footer_logos">
                <img className="footer_storelogo" src={process.env.PUBLIC_URL + 'apple-app-store.png'} alt="" />
                <img className="footer_storelogo" src={process.env.PUBLIC_URL + 'google-play-badge.png'} alt="" />
              </div>
            </div>
            <h5 className="footer_disclaimer">Zenmo is a service of PayPal, Inc., a licensed provider of money transfer services (NMLS ID: 910457). All money transmission is provided by PayPal, Inc. pursuant to PayPal, Inc.’s licenses. © 2020 PayPal, Inc.</h5>
          </div>
          </ThemeProvider>
        </div>
        </>
    );
}
export default LandingFooter;
