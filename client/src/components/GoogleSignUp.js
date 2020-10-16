import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../actions/authentication'
import { Button } from '@material-ui/core'

function GoogleSignUp() {

  const [auth, setAuth] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '200012556157-00bgj2c334hdictl0ipmu9ajusqb4bq4.apps.googleusercontent.com',
        scope: 'email',
        apiKey: 'AIzaSyBpuTpg1INY6eeEEeVNhCdrsrUYzj6qzZ8',
      }).then(() => {
        let authorized = window.gapi.auth2.getAuthInstance();
        setAuth(authorized);
      })
    });
  }, [])

    const handleSubmit = (e) => {
    e.preventDefault();
    try {
      auth.signIn().then(() => {
      const storeReady = dispatch(signUp(auth.currentUser.le.nt.dV, auth.currentUser.le.nt.fT, auth.currentUser.le.nt.Wt, auth.currentUser.le.nt.yT, auth.currentUser.le.nt.JJ))
        storeReady.then((result) => {
          if (result===true) {
            history.push('/dashboard');
          }
        })
      })
    }
   catch {
    const storeReady = dispatch(signUp('CauseError', 'CauseError', 'CauseError', 'CauseError', 'CauseError'))
      if (storeReady) {
        history.push('/signup/email');
      }
    }
  }

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
