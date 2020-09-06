import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';

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
          <button onClick={handleSubmit} className="ui blue google button" style={{marginBottom: 25}}>
          <i className="google icon" />
          Sign In
          </button>
        </>
    );
}
export default GoogleSign;
