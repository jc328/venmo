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
              <Link to="/"><img className="landing_logo" src={"https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/zenmo_logo_blue.svg"} alt="" /></Link>

              <div className="landing_buttons">

                <Button size="small" style={{fontColor:"white"}} disabled>Contact Us</Button>

                <Link to="/signin" style={{textDecoration: 'none'}}><Button size="small" style={{fontColor:"white"}}>Sign In</Button></Link>
              </div>
            </div>
              <Divider />
          </ThemeProvider>
        </>
    );
}
export default LandingHeader;
