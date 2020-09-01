import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signUp.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { TextField, Button, Checkbox } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';


function SignUp() {
    return (
      <>
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="signup_outer_container">
        <div className="signup_title">Create your account</div>
          <Button startIcon={<FacebookIcon />} variant="contained" color="primary" style={{marginBottom: 25}}>Sign Up with Facebook</Button>
        <div className="signup_container">
          <div className="signup_names">
            <div className="signup_firstname">
              <TextField
                required
                size="small"
                label="First Name">
              </TextField>
            </div>
            <div className="signup_lastname">
              <TextField
                required
                size="small"
                label="Last Name">
              </TextField>
            </div>
          </div>
          <div className="signup_text_container">
            <TextField
              required
              className="signup_fields"
              size="small"
              label="Email">
            </TextField>
          </div>
          <div className="signup_text_container">
            <TextField
              required
              className="signup_fields"
              size="small"
              label="Phone">
            </TextField>
          </div>
          <div className="signup_text_container">
            <TextField
              required
              className="signup_fields"
              size="small"
              label="Password">
            </TextField>
          </div>
          <div className="signup_disclosures">
            <Checkbox
              color="primary"
            />
            <p>I have read and agree to Venmo's User Agreement and Privacy Policy.</p>
          </div>
          <Link to="/" className="signin_signup_link">
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Link>
          <p className="signup_submit_disclaimer">By submitting, you confirm that you are authorized to use the number entered and agree to receive SMS texts to verify you own the number. Carrier fees may apply.</p>
        </div>

      </div>
      <LandingFooter />
      </ThemeProvider>
    </>
    );
}
export default SignUp;
