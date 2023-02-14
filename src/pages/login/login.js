import React, { useEffect, useRef, useState } from 'react';
import './login.scss'
import { IconLogo } from "../../utils/Icons";
import { useFormik } from "formik";
import { getToken, sendUserInformations, setToken } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Loader } from "../../components";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import Cookie from "js-cookie";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {accessToken, isPending} = useSelector( ( state ) => state.auth );
  const {clientId, redirectUrl} = useSelector( ( state ) => state.init );
  const [userInformation, setUserInformation] = useState( {} );

  const operationForm = useRef()

  useEffect( () => {
    if (accessToken) {
      navigate( '/home' )
    }
  }, [accessToken] )


  useEffect( () => {
    if (userInformation) {
      dispatch( getToken( userInformation ) );
      formik.values.password = ''
    }
  }, [userInformation] )

  const formError = () => {
    operationForm.current.classList.add( 'was-validated' )
  }

  const validate = values => {
    const errors = {};

    if (!values.userName) {
      errors.userName = 'Required';
    } else if (values.userName.length > 15) {
      errors.userName = 'Must be 15 characters or less';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 20) {
      errors.password = 'Must be 20 characters or less';
    }

    return errors;
  };

  const formik = useFormik( {
    initialValues: {
      userName: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      formError();
      setUserInformation( values );
    },
  } );

  const handleResponseGoogle = ( response ) => {
    if (response.accessToken) {
      Cookie.set( 'accessToken', response.tokenObj.id_token );
      dispatch( setToken( response.tokenObj.id_token ) )
    }
  }

  if (isPending) {
    return (<Loader/>)
  }

  return (
    <div className="form-signin w-100 m-auto">
      <form className="text-center login-form" onSubmit={formik.handleSubmit} ref={operationForm}>
        <IconLogo className="mb-5 align-self-center" style={{transform: 'scale(2)'}}/>
        <h1 className="h2 mb-3 fw-normal link-light">Sign in</h1>

        <div className="form-floating">
          <input name="userName" type="userName" className="form-control" id="floatingInput" placeholder="username"
                 onChange={formik.handleChange}
                 value={formik.values.userName}
                 onBlur={formik.handleBlur}
                 required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        {formik.touched.userName && formik.errors.userName ?
          <div className="text-danger">Username {formik.errors.userName}</div> : null}
        <div className="form-floating">
          <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"
                 onChange={formik.handleChange}
                 value={formik.values.password}
                 onBlur={formik.handleBlur}
                 required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {formik.touched.password && formik.errors.password ?
          <div className="text-danger">Password {formik.errors.password}</div> : null}

        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
        {clientId ?
          <GoogleLogin
            className="w-100 btn btn-lg btn-primary mt-3"
            clientId={clientId}
            scope=""
            buttonText="Login with Google"
            onSuccess={handleResponseGoogle}
            onFailure={handleResponseGoogle}
            cookiePolicy={'single_host_origin'}
            redirectUri={redirectUrl}
          /> : null}
      </form>
    </div>
  );
};

export default Login;
