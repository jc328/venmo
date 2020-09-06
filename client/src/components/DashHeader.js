import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchBar from './SearchBar.js'
// import SearchBarSem from './SearchBarSem.js'
import '../styles/dashheader.css';
import { Button, Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../actions/authentication';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import lightBlue from '@material-ui/core/colors/lightBlue';

const white = lightBlue[50]

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

function DashHeader(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector((state) => state.authentication.user.username)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(AuthActions.logout());
    history.push('/')
  }

  return (
      <>
        <ThemeProvider theme={theme}>
          <div className="dash_container">
            <div className="dash_logo_search">
              <Link to="/dashboard"><img className="dash_logo" src="https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/venmo_logo_white.svg" alt="" /></Link>
              <SearchBar />
            </div>

            <div className="dash_account_buttons">
              <Badge
                badgeContent={4}
                color="error"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}>
                <NotificationsNoneOutlinedIcon style={{color: white}}/>
              </Badge>
              <Button size="small">{username}</Button>
              <Button size="small">Statement</Button>
              <Button size="small">Settings</Button>
              <Button size="small">Help</Button>
              <Button size="small" onClick={handleSubmit}>Log Out</Button>
            </div>
          </div>


        </ThemeProvider>
      </>
  );
}
export default DashHeader;
