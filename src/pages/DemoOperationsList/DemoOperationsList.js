import React, { useEffect, useState } from 'react';
import './DemoOperationsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInfrastructure, deleteOperation,
  getLiveProcesses,
  getOperationStatus, postOperation, setManagementPopup, setSelectedInfrastructure,
} from '../../store/list';
import { Loader } from "../../components";
import Drawer from 'react-drag-drawer';
import moment from "moment-timezone";
import Table from '../../components/Table/Table';
import { useNavigate } from "react-router";

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    enableHTML: false
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
    enableHTML: false
  },
  {
    id: 'createdBy',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
    enableHTML: false
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Create Date',
    enableHTML: false
  },
  {
    id: 'expireDate',
    numeric: false,
    disablePadding: false,
    label: 'Expire Date',
    enableHTML: false
  },
  {
    id: 'buttons',
    numeric: false,
    disablePadding: true,
    label: '',
    enableHTML: true
  }
];

const formatDate = ( param ) => {
  //const date = moment.tz( param, "Atlantic/Azores" )
  const date = moment.tz( param, "" )
  return date.format( 'MM/D/YYYY, HH:MM:SS.SS' )
}

const DemoOperationsList = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    demoOperations,
    demoOperationsIsPending,
    deleteInfrastructurePending,
    isManagementPopupOpen
  } = useSelector( ( state ) => state.list );
  const {runEnvironmentIsPending} = useSelector( ( state ) => state.form );
  const [selectedOperation, setSelectedOperation] = useState()

  useEffect( () => {
    dispatch( getLiveProcesses() )
  }, [deleteInfrastructurePending, runEnvironmentIsPending] )

  useEffect( () => {
    dispatch( setManagementPopup( false ) )
  }, [] )

  const handleUpdateClick = ( operation ) => {
    delete operation.buttons
    dispatch( setSelectedInfrastructure( operation ) );
    navigate( '/operation_form', {replace: true} )
  }

  const closeManagementPopup = () => {
    dispatch( setManagementPopup( false ) )
  }

  const buttons = ( item ) => {
    const openManagementPopup = ( operation ) => {
      setSelectedOperation( operation )
      dispatch( setManagementPopup( true ) )
    }

    return (
      <div className={'d-flex justify-content-end'} title="Manage Infrastructure">
        <button className="btn btn-outline-success d-flex" onClick={() => openManagementPopup( item )}>
          <i aria-hidden="true" className="settings icon"></i> Manage
        </button>
      </div>
    )
  }

  if (demoOperationsIsPending || !demoOperations) {
    return (<Loader/>)
  }

  return (
    <section className={'d-flex flex-column align-items-center mb-5 overflow-auto m-md-5 p-md-5'}>
      <Table
        heads={headCells}
        rowsValue={demoOperations.map( item => {
          return {
            buttons,
            ...item,
            expireDate: formatDate( item.expireDate ),
            createdAt: formatDate( item.createdAt )
          }
        } )}
        mainHead={{label: "INFRASTRUCTURES", id: "infrastructuresTable", variant: 'h5'}}
        filterBy={[{fieldParameter: 'name', fieldType: 'text', fieldPlaceHolder: 'Name'},
          {fieldParameter: 'createdAt', fieldType: 'text', fieldPlaceHolder: 'Create Date'},
          {fieldParameter: 'expireDate', fieldType: 'text', fieldPlaceHolder: 'Expire Date'}]
        }
      />
      <Drawer
        open={isManagementPopupOpen}
        onRequestClose={closeManagementPopup}
        modalElementClass={"modal-element bg-secondary"}
        containerElementClass={"container-element"}
      >
        {selectedOperation ?
          <>
            <div className={'p-3 d-flex justify-content-center position-relative'}>
              <h4 className={'mt-2 primary link-primary fw-bold w-75 text-center'}>Manage Infrastructure {selectedOperation.name}</h4>
              <button style={{right: '10px'}} onClick={closeManagementPopup}
                      className="btn btn-outline-danger position-absolute">
                <i className="close icon ms-1"></i>
              </button>
            </div>
            <div className={'p-5 d-flex flex-column justify-content-center mb-5'}>
              <div className="flex-column text-center mb-5" role="group" aria-label="First group">
                <button onClick={() => dispatch( getOperationStatus( selectedOperation ) )} type="button"
                        className="btn btn-info mt-1 w-75 me-1">
                  View Operation Status
                </button>
                <button onClick={() => dispatch( postOperation( selectedOperation ) )} type="button"
                        className="btn btn-success mt-1 w-75 me-1">
                  Create Operation
                </button>
                <button onClick={() => dispatch( deleteOperation( selectedOperation ) )} type="button"
                        className="btn btn-danger mt-1 w-75 me-1">
                  Destroy Operation
                </button>
                <button onClick={() => dispatch( deleteInfrastructure( selectedOperation.name ) )} type="button"
                        className="btn btn-danger mt-1 w-75 me-1">
                  Delete Infrastructure
                </button>
{/*
                This button will be active after backend development
                <button onClick={() => handleUpdateClick( selectedOperation )} type="button"
                        className="btn btn-success mt-1 w-75 me-1">
                  Update
                </button>*/}
              </div>
            </div>
          </>
          : null}
      </Drawer>
    </section>);
};

export default DemoOperationsList;
