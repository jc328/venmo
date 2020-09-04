import React, { useEffect, useState } from 'react';

function GoogleAuth() {
  const [signIn, setSignIn] = useState('null');
  const [auth, setAuth] = useState('');
  // const [email, setEmail]= useState('')
  // const [user, setUser]= useState('')

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1072199093070-t1qbjbvbtmmnaf76sp92nv80ga1puu0o.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        let authorized = window.gapi.auth2.getAuthInstance();
        setAuth(authorized)
        // setEmail(auth.currentUser.le.rt.$t)
        // setUser(auth.currentUser.le.rt.tV + " " + auth.currentUser.le.rt.uT)
        setSignIn(authorized.isSignedIn.get())
      })
    });
  }, [signIn])

  return (
        <>
          <button className="ui blue google button" style={{marginBottom: 25}}>
          <i className="google icon" />
          Sign up with Google
          </button>
        </>
    );
}
export default GoogleAuth;
