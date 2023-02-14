import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

export const getToken = createAsyncThunk( '', async ( arg ) => {

} );

const slice = createSlice( {
  name: 'init',
  initialState: {
    clientId: null,
    redirectUrl: null
  },
  reducers: {
    setGoogleInit: ( state, action ) => {
      state.clientId = action.payload.clientId;
      state.redirectUrl = action.payload.redirectUrl;
    },
  },
  extraReducers: {

    [getToken.pending]: ( state, {payload} ) => {
    },

    [getToken.fulfilled]: ( state, {payload} ) => {

    },

    [getToken.rejected]: ( state, {payload} ) => {
    }

  },
} );

export default slice.reducer;

export const {
  setGoogleInit,
} = slice.actions;
