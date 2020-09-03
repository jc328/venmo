import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchBar from './SearchBar.js'
import '../styles/dashheader.css';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(255,255,255)'
    }
  }
})

function DashHeader() {

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log('print')
    dispatch(AuthActions.logout());
    return <Redirect to="/signin" />
  }

  return (
      <>
        <ThemeProvider theme={theme}>
          <div className="dash_container">
            <div className="dash_logo_search">
              <Link to="/"><img className="dash_logo" src="https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/venmo_logo_white.svg" alt="" /></Link>
              <div><SearchBar /></div>
            </div>

            <div className="dash_account_buttons">
              <Button size="small" style={{fontColor:"white"}}>Username</Button>
              <Button size="small" style={{fontColor:"white"}}>Statement</Button>
              <Button size="small" style={{fontColor:"white"}}>Settings</Button>
              <Button size="small" style={{fontColor:"white"}}>Help</Button>
              <Button size="small"
               style={{fontColor:"white"}}
               onClick={handleSubmit}
               >Log Out</Button>
            </div>
          </div>


        </ThemeProvider>
      </>
  );
}
export default DashHeader;
