import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';
import '../styles/landingHeader.css'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme.js';


function LandingHeader() {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div className="landing_navbar">
              <Link to="/"><img className="landing_logo" src={process.env.PUBLIC_URL + '/zenmo_logo_blue.svg'} alt="" /></Link>

              <div className="landing_buttons">

                <Link to="/about/product" style={{textDecoration: 'none'}}>
                <Button size="small" color="text.primary">How Zenmo Works</Button>
                </Link>

                <Button size="small" color="text.primary" disabled>Business</Button>
                <Button size="small" color="text.primary" disabled>Card</Button>
                <Button size="small" color="text.primary" disabled>Security</Button>
                <Button size="small" color="text.primary" disabled>Contact Us</Button>

                <Link to="/signin" style={{textDecoration: 'none'}}><Button size="small" color="text.primary">Sign In</Button></Link>
              </div>
            </div>
              <Divider />
          </ThemeProvider>
        </>
    );
}
export default LandingHeader;
