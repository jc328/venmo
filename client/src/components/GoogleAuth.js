import React, { useEffect, useState } from 'react';

function GoogleAuth() {
  const [signIn, setSignIn] = useState('null');

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1072199093070-t1qbjbvbtmmnaf76sp92nv80ga1puu0o.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        setSignIn(auth.isSignedIn.get())
      })
    });
  }, [])

  const test = () => {
    if (signIn === 'null') {
      return <div>Still Waiting</div>
    } else if (signIn) {
      return <div>Signed In</div>
    } else {
      return <div>NOT SIGNED IN!</div>
    }
  }


  return (
        <>
          <div>Google Auth: {test()}</div>
        </>
    );
}
export default GoogleAuth;
