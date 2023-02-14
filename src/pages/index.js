import React from 'react';

const NotFound = React.lazy( () => import('./NotFound/NotFound') );
const Login = React.lazy( () => import('./login/login') );
const Home = React.lazy( () => import('./Home/Home') );
const DemoOperationForm = React.lazy( () => import('./DemoOperationForm/DemoOperationForm') );
const DemoOperationsList = React.lazy( () => import('./DemoOperationsList/DemoOperationsList') );

export {
  NotFound,
  Home,
  DemoOperationsList,
  DemoOperationForm,
  Login
};
