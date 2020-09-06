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
        clientId: '1072199093070-t1qbjbvbtmmnaf76sp92nv80ga1puu0o.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        let authorized = window.gapi.auth2.getAuthInstance();
        setAuth(authorized)
      })
    });
  }, [])

    const handleSubmit = (e) => {
    e.preventDefault();
    auth.signIn().then(() => {
      const storeReady = dispatch(signUp(auth.currentUser.le.rt.tV, auth.currentUser.le.rt.uT, auth.currentUser.le.rt.$t, auth.currentUser.le.rt.NT, auth.currentUser.le.rt.TJ))

      storeReady.then((result) => {
        if (result===true) {
          history.push('/signin')
        }
      })
    })
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
