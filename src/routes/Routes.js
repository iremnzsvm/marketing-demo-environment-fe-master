import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  NotFound,
  Home,
  Login,
  DemoOperationForm
} from '../pages';
import { Routes } from 'react-router';
import { DefaultLayout } from '../containers';
import config from '../config/index';
import { Loader } from '../components';

const RouteList = (
  <Router basename={config.BASE_NAME}>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' name='Default' element={<DefaultLayout/>}>
          <Route exact path='/' name='Home' element={<Home/>}/>
          <Route exact path='/home' name='Home' element={<Home/>}/>
          <Route exact path='/operation_form' name='operation_form' element={<DemoOperationForm/>}/>
          <Route path='*' title="This page doesn't exist..." element={<NotFound/>}/>
        </Route>
        <Route exact path='/login' name='Login' element={<Login/>}/>
      </Routes>
    </Suspense>
  </Router>
);

export default RouteList;
