import React, { useEffect, useState } from 'react';
// import { Button, Divider } from '@material-ui/core';

function GoogleAuth() {
  const [signIn, setSignIn] = useState('null');
  const [auth, setAuth] = useState('');

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1072199093070-t1qbjbvbtmmnaf76sp92nv80ga1puu0o.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        let auth = window.gapi.auth2.getAuthInstance();
        setAuth(auth)
        setSignIn(auth.isSignedIn.get())
      })
    });
  }, [signIn])

  const onSignIn = () => {
    console.log('logging in')
    auth.signIn().then(() => {
      setSignIn(true)
    })
  };

  const onSignOut = () => {
    console.log('sign out')
    auth.signOut()
    setSignIn(false)
  }


  const status = () => {
    if (signIn === 'null') {
      return null;
    } else if (signIn) {
      return (
        <button onClick={onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={onSignIn} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }


  return (
        <>
          <div>{status()}</div>
        </>
    );
}
export default GoogleAuth;
