import React, { useEffect } from 'react';
import './Home.scss';
import {
  DemoOperationsList
} from '../index';
import useDidMountEffect from "../../hooks/useDidMountEffect/useDidMountEffect";
import Cookie from "js-cookie";

const Home = () => {
  useEffect(()=>{
    if (!Cookie.get( 'accessToken' )) {
      window.location.href = '/login'
    }
  },[])

  return (
      <DemoOperationsList/>
  );

};

export default Home;
