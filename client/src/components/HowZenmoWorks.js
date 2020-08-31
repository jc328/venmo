import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Divider } from '@material-ui/core';
import '../styles/howzenmoworks.css'
import LandingHeader from '../components/LandingHeader.js'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme.js'

function HowZenmoWorks() {
    return (
        <>
          <ThemeProvider theme={theme}>
            <LandingHeader />
            <h2>Video and Scrolling Text</h2>
          </ThemeProvider>
        </>
    );
}
export default HowZenmoWorks;
