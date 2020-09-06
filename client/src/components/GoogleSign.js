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
        clientId: '1072199093070-t1qbjbvbtmmnaf76sp92nv80ga1puu0o.apps.googleusercontent.com',
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
    console.log(auth)
    const storeReady = await dispatch(AuthActions.signIn(auth.currentUser.le.rt.$t, auth.currentUser.le.rt.NT));
    if (storeReady) {
      history.push('/dashboard')
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
