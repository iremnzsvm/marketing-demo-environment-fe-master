import axios from 'axios';
import config from '../../config';
import {
  requestHandler,
  successHandler,
  errorHandler
} from '../interceptors';

const BASE_URL = window.localStorage.getItem('BASE_URL')

// add your BASE_URL to Constants file

export const axiosEmpty = axios.create({
  baseURL: BASE_URL,
  headers: {
  }
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
  }
});

// Handle request process
axiosInstance.interceptors.request.use(
  ( request ) => requestHandler( request ) );
// Handle response process
axiosInstance.interceptors.response.use(
  ( response ) => successHandler( response ),
  ( error ) => errorHandler( error )
);

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    platform: 'web',
    //authenticationToken: (sessionStorage.getItem('accessToken'))
  }
});

// Handle request process
axiosDefault.interceptors.request.use( ( request ) => requestHandler( request ) );
// Handle response process
axiosDefault.interceptors.response.use(
  ( response ) => successHandler( response ),
  ( error ) => errorHandler( error )
);
