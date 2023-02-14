import React, { useEffect } from 'react';
import { ErrorBoundary } from './components';
import './App.scss';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import Routes from './routes/Routes';
import { getToken } from './store/auth';
import { setGoogleInit } from './store/init';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const {accessToken} = useSelector( ( state ) => state.auth );

  useEffect( () => {
    let clientId = null;
    let redirectUrl = null;
    if (window.localStorage.getItem( 'CLIENT_ID' )) {
      clientId = window.localStorage.getItem( 'CLIENT_ID' )
      redirectUrl = window.localStorage.getItem( 'REDIRECT_URL' )
    } else {
      clientId = '693098272055-eu8vqeauku85kg6b7sr1nt5pnqhfd7mm.apps.googleusercontent.com';
      redirectUrl = 'https://dev.em.api-evam.com/';
    }
    dispatch( setGoogleInit( {clientId, redirectUrl} ) );
  }, [] );

  useEffect( () => {
    if (!accessToken) {
      dispatch( getToken() )
    }
    ;
  }, [] );

  return (
    <ErrorBoundary>
      <ToastContainer
        limit={2}
        autoClose={2000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="toast-container"
        position="top-center"
        //bodyClassName={() => "toast-container"}
        //toastClassName="dark-toast"
        //closeButton={CloseButton}
      />
      {Routes}
    </ErrorBoundary>
  );
}

export default App;
