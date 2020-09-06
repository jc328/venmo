import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../actions/authentication';

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
      const storeReady = dispatch(signUp(auth.currentUser.le.rt.tV, auth.currentUser.le.rt.uT, auth.currentUser.le.rt.$t, auth.currentUser.le.rt.NT))

      storeReady.then((result) => {
        if (result===true) {
          history.push('/signin')
        }
      })
    })
  }






  return (
        <>
          <button onClick={handleSubmit} className="ui blue google button" style={{marginBottom: 25}}>
          <i className="google icon" />
          Sign up with Google
          </button>
        </>
    );
}
export default GoogleSignUp;
