import React, { useEffect, useRef, useState } from 'react';
import './DemoOperationForm.scss';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { runEnvironment, updateInfrastructure } from "../../store/form";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import moment from "moment-timezone";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();


const formatDateForDatePicker = ( param ) => {
  const date = moment.tz( param, "Europe/Istanbul" );
  return date.format( 'YYYY-MM-DDThh:mm:ss' );
}

const initialDemoOperationProp = {
  name: '',
  requestId: '',
  region: '',
  instanceType: '',
  category: '',
  createdAt: '',
  updatedAt: '',
  expireDate: formatDateForDatePicker( new Date().valueOf() ),
  modules: []
}

const handleValue = ( demoOperation ) => {
  if (demoOperation) {
    const expireDate = new Date( demoOperation.expireDate )
    return {...demoOperation, expireDate: formatDateForDatePicker( expireDate )}
  } else {
    return initialDemoOperationProp
  }
}

const DemoOperationForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {selectedInfrastructure} = useSelector( ( state ) => state.list );
  const [infrastructure, setInfrastructure] = useState( handleValue( selectedInfrastructure ) )
  const [modules, setModules] = useState( [
    "MARKETING_SDK_API",
    "MARKETING_SDK_COMMUNICATOR",
    "MARKETING_SDK_LISTENER",
    "MARKETING_COMMUNICATOR",
    "MARKETING_EMAIL_SENDER",
    "MARKETING_PUSHER",
    "MARKETING_LOG_PROCESSOR",
    "MARKETING_OFFER_PROCESSOR",
    "MARKETING_PUBLIC_API",
    "MARKETING_SEGMENTER",
    "MARKETING_SMS_SENDER",
    "RECOMMENDATION",
    "RECOMMENDATION_EVENT",
    "SERVICE_LAYER",
    "ENGINE"
  ] )

  useEffect( () => {
    setInfrastructure( handleValue( selectedInfrastructure ) )
  }, [selectedInfrastructure] )

  const operationForm = useRef();
  const selectElement = useRef()

  const handleSubmit = ( e ) => {
    if (!operationForm.current.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
    }
    operationForm.current.classList.add( 'was-validated' )
  }

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }

    if (!values.instanceType) {
      errors.instanceType = 'Required';
    }

    if (!values.category) {
      errors.category = 'Required';
    }

    if (!values.region) {
      errors.region = 'Required';
    }

    if (!values.expireDate) {
      errors.expireDate = 'Required';
    }
    if (!values.modules.length) {
      errors.modules = 'Required';
    }

    return errors;
  };

  const formik = new useFormik( {
    initialValues: infrastructure,
    validate,
    onSubmit: values => {
      const infrastructure = {
        expireDate: new Date(formatDateForDatePicker( values.expireDate )),
        createdAt: new Date(),
        updatedAt: values.createdAt,
        name: values.name,
        region: values.region,
        modules: values.modules,
        instanceType: values.instanceType,
        category: values.category
      };
      if (selectedInfrastructure) {
        dispatch( updateInfrastructure( infrastructure ) ).then( data => {
          if (!data.error) {
            toast.dismiss()
            toast.success( `${infrastructure.name} Saved` );
            navigate( '/home', {replace: true} )
          }
        } );
      } else {
        dispatch( runEnvironment( infrastructure ) ).then( data => {
          if (!data.error) {
            toast.dismiss()
            toast.success( `${infrastructure.name} Saved` );
            navigate( '/home', {replace: true} )
          }
        } );
      }
    },
    enableReinitialize: true
  } );

  const handleSelectBoxClick = () => {
    if (document.getElementsByClassName( ' css-g1d714-ValueContainer' ) && document.getElementsByClassName( ' css-g1d714-ValueContainer' )[0]) {
      document.getElementsByClassName( ' css-g1d714-ValueContainer' )[0].firstChild.style.width = 'fit-content'
    }
  }

  return (
    <section className={'container operation-form bg-light'}>
      <div className="row g-5 justify-content-center pb-5">
        <div className="col-md-9 col-lg-8">
          <div className={'text-center'}>
            <h1
              className="mb-3">{selectedInfrastructure ? `${selectedInfrastructure.name} Infrastructure Update` : 'Infrastructure Form'}</h1>
          </div>

          <form className="needs-validation" noValidate ref={operationForm} onSubmit={( e ) => {
            formik.handleSubmit( e );
            handleSubmit( e )
          }}>
            <div className="row g-3">
              <div className="col-sm-12">
                <label htmlFor="name" className="form-label">Infrastructure Name</label>
                <input type="text" className="form-control" id="name" placeholder="name"
                       onChange={formik.handleChange}
                       value={formik.values.name}
                       onBlur={formik.handleBlur}
                       required/>
                {formik.touched.name && formik.errors.name ?
                  <div className="text-danger">Name {formik.errors.name}</div> : null}
              </div>

              <div className="col-md-5">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-select" id="category" required
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        onBlur={formik.handleBlur}>
                  <option value=""></option>
                  <option>BANK</option>
                  <option>TELCO</option>
                </select>
                {formik.touched.category && formik.errors.category ?
                  <div className="text-danger">Category {formik.errors.category}</div> : null}
              </div>

              <div className="col-md-4">
                <label htmlFor="instanceType" className="form-label">Instance Type</label>
                <select className="form-select" id="instanceType" required
                        onChange={formik.handleChange}
                        value={formik.values.instanceType}
                        onBlur={formik.handleBlur}>
                  <option value=""></option>
                  <option>M5A_4XLARGE</option>
                </select>
                {formik.touched.instanceType && formik.errors.instanceType ?
                  <div className="text-danger">Instance Type {formik.errors.instanceType}</div> : null}
              </div>

              <div className="col-md-3">
                <label htmlFor="region" className="form-label">Region</label>
                <select className="form-select" id="region" required
                        onChange={formik.handleChange}
                        value={formik.values.region}
                        onBlur={formik.handleBlur}>
                  <option value=""></option>
                  <option value={'EU_CENTRAL_1'}>EU_CENTRAL_1</option>
                </select>
                {formik.touched.region && formik.errors.region ?
                  <div className="text-danger">Region {formik.errors.region}</div> : null}
              </div>
            </div>

            <hr/>
            <div className="col-sm-12">
              <label htmlFor="expireDate" className="form-label">Expire Date</label>
              <input
                step='3'
                type='datetime-local'
                name="expireDate"
                className="form-control"
                id="expireDate"
                onChange={formik.handleChange}
                value={formik.values.expireDate}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.expireDate && formik.errors.expireDate ?
                <div className="text-danger">Expire Date {formik.errors.expireDate}</div> : null}
            </div>

            <hr/>

            <div className="w-100" onClick={handleSelectBoxClick}>
              <label htmlFor="modules" className="form-label">Modules</label>
              <Select
                ref={selectElement}
                id="modules"
                name="modules"
                onBlur={formik.handleBlur}
                type='modules'
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={( $event ) => formik.values.modules = $event.map( item => item.value )}
                defaultValue={infrastructure.modules.map( module => {
                  return {'value': module, 'label': module, isSelected: true}
                } )}
                isMulti
                options={modules.map( module => {
                  return {'value': module, 'label': module}
                } )}
                required
              />
              {formik.touched.modules && formik.errors.modules ?
                <div className="text-danger">Module {formik.errors.modules}</div> : null}
            </div>
            <hr/>
            <button className="w-100 btn btn-primary btn-lg"
                    type="submit">{selectedInfrastructure ? 'Update Infrastructure' : 'Start Infrastructure'}</button>
          </form>
        </div>
      </div>
    </section>
  );

};

export default DemoOperationForm;
