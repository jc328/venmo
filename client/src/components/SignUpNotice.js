import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signUpNotice.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CreditCardIcon from '@material-ui/icons/CreditCard';


function SignUpNotice() {

    return (
      <>
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="signup_outer_container">
        <div className="signup_box">
          <div className="signup_title">The fun and easy way to send, spend, and receive money</div>
        </div>
        <CompareArrowsIcon style={{color:"3D95CE", fontSize:"30px"}}/>
        <div className="signup_flaver_text">Make payments using your debit card, credit card, bank account, and more</div>
        <LocalAtmIcon color="primary" style={{color:"3D95CE", fontSize:"30px"}}/>
        <div className="signup_flaver_text">Track all your payments in one place, and split or share with Venmo friends</div>
        <CreditCardIcon size="large" style={{color:"3D95CE", fontSize:"30px"}}/>
        <div className="signup_flaver_text">Apply for a Venmo card and take Venmo shopping everywhere Mastercard® is accepted in the U.S.  A quick look at our fees</div>
        <Divider />
        <Link to='/signup/email' style={{textDecoration:'none', marginTop:50}}>
          <Button
            variant="contained"
            color="primary"
            className="signup_next_button"
            style={{backgroundColor:"#3D95CE", color:"white"}}
          >Next</Button>
        </Link>
      </div>

      <LandingFooter />
      </ThemeProvider>
    </>
    );
}
export default SignUpNotice;
