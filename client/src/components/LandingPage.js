import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../actions/authentication';
import ReactPlayer from 'react-player';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import '../styles/landingPage.css';
import { Button } from '@material-ui/core';
import theme from '../styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const LandingPage = ({ needSignin }) => {
  const dispatch = useDispatch();
  const userExists = useSelector(state => state.authentication.user);

  useEffect(() => {
    const getToken = async () => {
      await dispatch(AuthActions.loadToken());
      await dispatch(AuthActions.loadUser());
    }
    getToken();
  }, [dispatch]);

  const renderRedirect = () => {
    if (!needSignin) {
      return <Redirect to='/dashboard' />
    }
  };

  return (
    <>
      {userExists ? renderRedirect() : null}
      <ThemeProvider theme={theme}>
      <LandingHeader />
      <div className="landing_body">
        <div className="landing_body_images">
          <img className="landing_blinking_cursur" src={"https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/blinking_cursur.gif"} alt="" />
          <img className="landing_nexus" src={"https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/nexus.png"} alt="" />
            <div className="landing_combined_iphone">
            <img className="landing_iphone" src={"https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/iphone6crop.png"} alt="" />
            <div className="landing__iphone-border" />
            <ReactPlayer className="landing_iphone_video" height="380px" loop={true} autoPlay playing={true} muted={true} url={"https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/landing-video.mp4"} />
            </div>
        </div>

        <div className="landing_body_text_box">
          <div style={{lineHeight: 1}}>Send money and make purchases at approved merchants</div>

          <Link to="/signup" style={{textDecoration: 'none'}}>
            <Button variant="contained"  style={{width: '100%', marginTop: '30px', backgroundColor:"#3D95CE", color:"white"}}>Sign Up Now</Button>
          </Link>
        </div>
      </div>
      <LandingFooter />
      </ThemeProvider>
    </>
  );
}
export default LandingPage;
