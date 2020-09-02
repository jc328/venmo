import React from 'react';
import theme from '../styles/theme.js'
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchBar from './SearchBar.js'
import '../styles/dashheader.css';
import { Button } from '@material-ui/core';


function DashHeader() {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div className="dash_container">
              <div className="dash_logo_search">
                <Link to="/"><img className="landing_logo" src={process.env.PUBLIC_URL + '/zenmo_logo_blue.svg'} alt="" /></Link>
                <div><SearchBar /></div>
              </div>

              <div className="dash_account_buttons">
                <Button size="small" color="primary">User Name</Button>
                <Button size="small" color="primary">Statement</Button>
                <Button size="small" color="primary">Settings</Button>
                <Button size="small" color="primary">Help</Button>
                <Button size="small" color="primary">Log Out</Button>
              </div>
            </div>


          </ThemeProvider>
        </>
    );
}
export default DashHeader;
