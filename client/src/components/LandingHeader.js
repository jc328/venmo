import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';
import '../styles/landingHeader.css'
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';




function LandingHeader(props) {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div className="landing_navbar">
              <Link to="/"><img className="landing_logo" src={process.env.PUBLIC_URL + 'zenmo_logo_blue.svg'} alt="" /></Link>
              <div className="landing_buttons">
                <Button size="small" color="primary">How Zenmo Works</Button>
                <Button size="small" color="primary">Business</Button>
                <Button size="small" color="primary">Card</Button>
                <Button size="small" color="primary">Security</Button>
                <Button size="small" color="primary">Contact Us</Button>
                <Link to="/signin" style={{textDecoration: 'none'}}><Button size="small" color="primary" >Sign In</Button></Link>
              </div>
            </div>
              <Divider />
          </ThemeProvider>
        </>
    );
}
export default LandingHeader;
