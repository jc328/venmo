import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';
import { Button } from '@material-ui/core'

function GoogleSign() {

  const [auth, setAuth] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '200012556157-3fntfk0a57vul9q3j8f8jdaro0kbb1ar.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        let authorized = window.gapi.auth2.getAuthInstance();
        setAuth(authorized)
      })
    });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.removeAuth());
    try {
      const storeReady = await dispatch(AuthActions.signIn(auth.currentUser.le.nt.Wt, auth.currentUser.le.nt.yT));
      if (storeReady) {
        history.push('/dashboard')
      }
    } catch {
      const storeReady = await dispatch(AuthActions.signIn('causeError', 'C4useError' ));
      if (storeReady) {
        history.push('/dashboard')
      }
    }
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
