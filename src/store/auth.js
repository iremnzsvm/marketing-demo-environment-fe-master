import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';
import { requestPayload } from '../utils/Constants';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

export const getToken = createAsyncThunk( '', async ( arg ) => {
  try {
    const response = await API.createSession( {...arg, ...requestPayload} );
    return response.data;
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return err.response.data
  }

} );

export const sendUserInformations = createAsyncThunk( '', async ( arg ) => {
  try {
    const response = await API.sendUserInformations( {...arg, ...requestPayload} );
    return response.data;
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return err.response.data
  }

} );

const slice = createSlice( {
  name: 'auth',
  initialState: {
    isPending: null,
    accessToken: null,
    refreshToken: null,
    authErrorMessage: null,
    clientId: null,
    redirectUrl: null
  },
  reducers: {
    setToken: ( state, action ) => {
      state.accessToken = action.payload
    },
  },
  extraReducers: {

    [getToken.pending]: ( state, {payload} ) => {
      state.isPending = true
    },
    [getToken.fulfilled]: ( state, {payload} ) => {
      state.isPending = false
      if (payload.accessToken) {
        toast.success( payload.message );
        Cookies.set( 'accessToken', payload.accessToken );
        state.refreshToken = payload.refreshToken;
        state.accessToken = payload.accessToken;
      } else {
        state.authErrorMessage = payload.message
        toast.dismiss();
        toast.error( payload.message );
      }
    },
    [getToken.rejected]: ( state, {payload} ) => {
      state.isPending = false
    },

    [sendUserInformations.pending]: ( state, {payload} ) => {
      state.isPending = true
    },
    [sendUserInformations.fulfilled]: ( state, {payload} ) => {
      console.log(payload)
    },
    [sendUserInformations.rejected]: ( state, {payload} ) => {
      state.isPending = false
    }

  },
} );

export default slice.reducer;

export const {
  setToken,
} = slice.actions;
