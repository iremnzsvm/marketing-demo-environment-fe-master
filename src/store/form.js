import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';

export const runEnvironment = createAsyncThunk( 'demo-environment/infrastructures', async ( arg ) => {
  const response = await API.runEnvironment( {...arg} );
  return response.data;
} );

export const updateInfrastructure = createAsyncThunk( 'updateInfrastructure', async ( arg ) => {
  const response = await API.updateInfrastructure( {...arg} );
  return response.data;
} );

const slice = createSlice( {
  name: 'form',
  initialState: {
    runEnvironmentIsPending: false,
    runEnvironmentHasError: false
  },
  reducers: {
    setIsFormOpen: ( state, action ) => {
      state.isFormOpen = action.payload;
    },
  },
  extraReducers: ( builder ) => {
    builder.addCase( runEnvironment.pending, ( state, {payload} ) => {
      state.runEnvironmentIsPending = true;
    } );
    builder.addCase( runEnvironment.fulfilled, ( state, action ) => {
      state.runEnvironmentHasError = action.payload.error
      state.runEnvironmentIsPending = false;
    } );
    builder.addCase( runEnvironment.rejected, ( state, action ) => {
      state.runEnvironmentIsPending = false;
    } );

    builder.addCase( updateInfrastructure.pending, ( state, {payload} ) => {
      state.runEnvironmentIsPending = true;
    } );
    builder.addCase( updateInfrastructure.fulfilled, ( state, action ) => {
      state.runEnvironmentHasError = action.payload.error
      state.runEnvironmentIsPending = false;
    } );
    builder.addCase( updateInfrastructure.rejected, ( state, action ) => {
      state.runEnvironmentIsPending = false;
    } );
  },
} );

export default slice.reducer;

export const {
  setIsFormOpen,
} = slice.actions;
