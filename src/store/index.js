import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import list from './list';
import auth from './auth';
import form from "./form";
import init from "./init";

const reducer = combineReducers( {
  list,
  auth,
  form,
  init
} );

const store = configureStore( {
  reducer,
} );

export default store;
