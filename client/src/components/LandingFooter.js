import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingFooter.css'
import theme from '../styles/theme.js'
import { Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

function LandingFooter() {
    return (
        <>
        <Divider style={{marginTop: '50px'}}/>
        <div className="landing_footer_outer">

          <ThemeProvider theme={theme}>
          <div className="landing_footer_container">

            <div className="footer_container">
              <div className="footer_links_container">
                <p className="footer_title">Learn More</p>
                <Link to="" className="footer_links">How it Works</Link>
                <Link to="" className="footer_links">Contact Us</Link>
                <Link to="" className="footer_links">Business</Link>
              </div>
              <div className="footer_links_container">
                <p className="footer_title">Company</p>
                <Link to="" className="footer_links">Our Team</Link>
                <Link to="" className="footer_links">Jobs</Link>
              </div>
              <div className="footer_links_container">
                <p className="footer_title">Community</p>
                <Link to="" className="footer_links">Blog</Link>
                <Link to="" className="footer_links">Help Center</Link>
              </div>
              <div className="footer_logos">
                <a href="https://www.apple.com/lae/ios/app-store/">
                <img className="footer_storelogo" src={process.env.PUBLIC_URL + '/apple-app-store.png'} alt="" />
                </a>
                <a href="https://play.google.com/store/apps?hl=en_US">
                <img className="footer_storelogo" src={process.env.PUBLIC_URL + '/google-play-badge.png'} alt="" style={{marginLeft: "15px"}}/>
                </a>
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
