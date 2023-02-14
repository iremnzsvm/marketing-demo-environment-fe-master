import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';
import { requestPayload } from '../utils/Constants';
import { toast } from "react-toastify";

export const getLiveProcesses = createAsyncThunk( 'getLiveProcesses', async () => {
  const response = await API.getEnvironmentList( {requestPayload} );
  return response.data;
} );

export const deleteInfrastructure = createAsyncThunk( 'deleteInfrastructure', async ( params ) => {
  const response = await API.deleteInfrastructure( params );
  return response.data;
} );

export const postOperation = createAsyncThunk( 'postOperation', async ( params ) => {
  const response = await API.postOperation( params );
  return response.data;
} );

export const getOperationStatus = createAsyncThunk( 'getOperationStatus', async ( params ) => {
  const response = await API.getOperationStatus( params );
  return response.data;
} );

export const deleteOperation = createAsyncThunk( 'deleteOperation', async ( params ) => {
  const response = await API.deleteOperation( params );
  return response.data;
} );

const slice = createSlice( {
  name: 'list',
  initialState: {
    demoOperations: null,
    demoOperationsIsPending: false,
    isFormOpen: false,
    deleteInfrastructurePending: false,
    postOperationsPending: false,
    getOperationStatusPending: false,
    selectedInfrastructure: null,
    isManagementPopupOpen: false
  },
  reducers: {
    setDemoOperationList: ( state, action ) => {
      state.demoOperations = [action.payload, ...state.demoOperations];
    },
    setSelectedInfrastructure: ( state, action ) => {
      state.selectedInfrastructure = action.payload;
    },
    setManagementPopup: ( state, action ) => {
      state.isManagementPopupOpen = action.payload;
    }
  },
  extraReducers: ( builder ) => {
    builder.addCase( getLiveProcesses.pending, ( state, {payload} ) => {
      state.demoOperationsIsPending = true;
    } );
    builder.addCase( getLiveProcesses.fulfilled, ( state, {payload} ) => {
      state.demoOperations = payload.infrastructures;
      state.demoOperationsIsPending = false;
    } );
    builder.addCase( getLiveProcesses.rejected, ( state, {payload} ) => {
      state.demoOperationsIsPending = false;
    } );

    builder.addCase( deleteInfrastructure.pending, ( state, {payload} ) => {
      state.deleteInfrastructurePending = true;
    } );
    builder.addCase( deleteInfrastructure.fulfilled, ( state, {payload} ) => {
      toast.dismiss();
      toast.success( payload.message );
      //state.demoOperations = payload.infrastructures;
      state.deleteInfrastructurePending = false;
    } );
    builder.addCase( deleteInfrastructure.rejected, ( state, {payload} ) => {
      state.deleteInfrastructurePending = false;
    } );

    builder.addCase( postOperation.pending, ( state, {payload} ) => {
      state.getOperationsPending = true;
    } );
    builder.addCase( postOperation.fulfilled, ( state, {payload} ) => {
      toast.dismiss();
      toast.success( payload.message );
      //state.demoOperations = payload.infrastructures;
      state.getOperationsPending = false;
    } );
    builder.addCase( postOperation.rejected, ( state, {payload} ) => {
      state.getOperationsPending = false;
    } );

    builder.addCase( getOperationStatus.pending, ( state, {payload} ) => {
      toast.dismiss();
      state.getOperationStatusPending = true;
    } );
    builder.addCase( getOperationStatus.fulfilled, ( state, {payload} ) => {
      toast.dismiss();
      toast.info( payload.status );
      state.getOperationStatusPending = false;
    } );
    builder.addCase( getOperationStatus.rejected, ( state, {payload} ) => {
      toast.dismiss();
      state.getOperationStatussPending = false;
    } );

    builder.addCase( deleteOperation.pending, ( state, {payload} ) => {
      state.getOperationStatusPending = true;
    } );
    builder.addCase( deleteOperation.fulfilled, ( state, {payload} ) => {
      toast.dismiss();
      toast.success( payload.message );
      //state.demoOperations = payload.infrastructures;
      state.getOperationStatusPending = false;
    } );
    builder.addCase( deleteOperation.rejected, ( state, {payload} ) => {
      state.getOperationStatussPending = false;
    } );
  },
} );

export default slice.reducer;

export const {
  setSelectedInfrastructure,
  setManagementPopup,
  setDemoOperationList
} = slice.actions;
