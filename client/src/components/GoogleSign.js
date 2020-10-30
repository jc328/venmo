import React from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import * as AuthActions from '../actions/authentication';
import { Button } from '@material-ui/core';

const GoogleSign = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.removeAuth());
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
          const profile = authorized.currentUser.get().getBasicProfile();
          const storeReady = dispatch(AuthActions.signInGoogle(profile.getEmail()));
          if (storeReady) {
            history.push('/dashboard')
          }
        } catch {
          const storeReady = dispatch(AuthActions.signIn('causeError', 'C4useError' ));
          if (storeReady) {
            history.push('/dashboard')
          }
        }
      })
    });
  }

  return (
        <>
          <Button onClick={handleSubmit} variant="contained" className="" style={{marginBottom: 25, backgroundColor:"#3D95CE", color:"white"}}>
          <i className="google icon" style={{marginBottom: 8}}/>
          Sign In
          </Button>
        </>
    );
}
export default GoogleSign;
