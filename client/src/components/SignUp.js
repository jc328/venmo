import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/signUp.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { TextField, Button, Checkbox } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useDispatch } from 'react-redux'
import { signUp } from '../store/user';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(firstName, lastName, email, password));
  }

    return (
      <>
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="signup_outer_container">
        <div className="signup_title">Create your account</div>
          <Button startIcon={<FacebookIcon />} variant="contained" color="primary" style={{marginBottom: 25}}>Sign Up with Facebook</Button>
        <div className="signup_container">
          <form onSubmit={handleSubmit}>
            <div className="signup_names">
              <div className="signup_firstname">
                <TextField
                  required
                  size="small"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  label="First Name">
                </TextField>
              </div>
              <div className="signup_lastname">
                <TextField
                  // required
                  size="small"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  label="Last Name">
                </TextField>
              </div>
            </div>
            <div className="signup_text_container">
              <TextField
                // required
                className="signup_fields"
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email">
              </TextField>
            </div>
            <div className="signup_text_container">
              <TextField
                // required
                className="signup_fields"
                size="small"
                label="Phone">
              </TextField>
            </div>
            <div className="signup_text_container">
              <TextField
                // required
                className="signup_fields"
                size="small"
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password">
              </TextField>
            </div>
            <div className="signup_disclosures">
              <Checkbox
                required
                color="primary"
              />
              <p>I have read and agree to Venmo's User Agreement and Privacy Policy.</p>
            </div>
            {/* <Link to="/" className="signin_signup_link"> */}
            <div className="signin_signup_link">
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </div>
            {/* </Link> */}
          <p className="signup_submit_disclaimer">By submitting, you confirm that you are authorized to use the number entered and agree to receive SMS texts to verify you own the number. Carrier fees may apply.</p>
          </form>
        </div>

      </div>
      <LandingFooter />
      </ThemeProvider>
    </>
    );
}
export default SignUp;
