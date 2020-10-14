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
              <h3 className="dev">Developed By:</h3>
              <div className="footer_links_container">
                <p className="footer_title">John Chen</p>
                <a href="https://www.linkedin.com/in/john-chen-92714817/" className="footer_links">LinkedIn</a>
                <a href="https://github.com/jc328" className="footer_links">GitHub</a>
              </div>
              <div className="footer_links_container">
                <p className="footer_title">Robert Estrada</p>
                <a href="https://www.linkedin.com/in/robertmestrada/" className="footer_links">LinkedIn</a>
                <a href="https://github.com/robertestrada" className="footer_links">GitHub</a>
              </div>
              <div className="footer_links_container">
                <p className="footer_title">Greg Lloyd</p>
                <a href="https://www.linkedin.com/in/greglloyd1/" className="footer_links">LinkedIn</a>
                <a href="https://github.com/Greg001100" className="footer_links">GitHub</a>
              </div>
              <div className="footer_logos">

              </div>
            </div>
            <h5 className="footer_disclaimer" style={{marginBottom: 25}}>Zenmo is a service of PayBuddy, Inc., a licensed provider of money transfer services (NMLS ID: 999999). All money transmission is provided by PayBuddy, Inc. pursuant to PayBuddy, Inc.’s licenses. © 2020 PayBuddy, Inc.</h5>
          </div>
          </ThemeProvider>
        </div>
        </>
    );
}
export default LandingFooter;
