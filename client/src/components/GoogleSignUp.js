import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import { signUpGoogle } from '../actions/authentication';
import { Button } from '@material-ui/core';

const GoogleSignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const googleCredsFetch = await fetch(`${baseUrl}/google-credentials`);
    const googleCreds = await googleCredsFetch.json();

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: `${googleCreds.client_id}`,
        scope: 'email',
        apiKey: `${googleCreds.api_key}`,
      }).then(() => {
        const authorized = window.gapi.auth2.getAuthInstance();
        try {
          authorized.signIn().then(() => {
            const profile = authorized.currentUser.get().getBasicProfile();
            const storeReady = dispatch(signUpGoogle(profile.getGivenName(), profile.getFamilyName(), profile.getEmail(), profile.getImageUrl()));
            storeReady.then((result) => {
              if (result === true) {
                history.push('/dashboard');
              }
            })
          })
        }
        catch {
          const storeReady = dispatch(signUpGoogle('CauseError', 'CauseError', 'CauseError', 'CauseError'))
          if (storeReady) {
            history.push('/signup/email');
          }
        }
      });
    });
  };

  return (
        <>
          <Button onClick={handleSubmit} variant="contained" className="" style={{marginBottom: 25, backgroundColor:"#3D95CE", color:"white"}}>
          <i className="google icon" style={{marginBottom: 8}}/>
          Signup with Google
          </Button>
        </>
    );
}
export default GoogleSignUp;
