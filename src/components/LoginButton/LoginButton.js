import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import Cookie from "js-cookie";

const Login = () => {

  const navigate = useNavigate();

  const [clientId, setClientId] = useState();
  const [redirectUrl, setRedirectUrl] = useState();

  useEffect( () => {
    setClientId(window.localStorage.getItem('CLIENT_ID'));
    setRedirectUrl(window.localStorage.getItem('REDIRECT_URL'));
  }, [] )

  useEffect(()=>{
    function start() {
      console.log(gapi)
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
      console.log(clientId)
    }
    gapi.load('client:auth2', start)

  },[clientId])

  const responseGoogle = (response) => {
    console.log(response);
    Cookie.set( 'accessToken', response.tokenObj.id_token);
    if (response.accessToken) {
      navigate( '/home' )
    }
  }

  return (
        <GoogleLogin
          className="w-100 btn btn-lg btn-primary mt-3"
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          redirectUri={redirectUrl}
        />
  );
};

export default Login;
