import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { IconLogoWhite } from "../../utils/Icons";
import { Icon } from "semantic-ui-react";
import './DefaultLayout.scss';
import { setSelectedInfrastructure } from "../../store/list";
import { useDispatch } from "react-redux";

const DefaultLayout = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const scroller = useRef();
  const [inDeep, setInDeep] = useState( false )

  const setUpButtonVisibility = () => {
    window.pageYOffset > 180 ? setInDeep( true ) : setInDeep( false )
  }

  useEffect( () => {
    window.addEventListener( "scroll", setUpButtonVisibility, false );
  }, [] );

  const handleCreateInfrastructure = (e) => {
    e.preventDefault()
    dispatch( setSelectedInfrastructure( null ) );
    navigate( '/operation_form', {replace: true} )
  }

  return (
    <>
      <header className={'mb-5 pb-5 position-fixed'} style={{zIndex: 1}} ref={scroller}>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <Link to="home" className="navbar-brand"><IconLogoWhite className="align-self-center"/></Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0 ps-md-4 ps-sm-4">
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/operation_form" onClick={(e)=>handleCreateInfrastructure(e)}>Infrastructure Form</Link>
                </li>
                {/*<li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">DemoOperationForm</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">go to Login</Link>
                </li>*/}
              </ul>
              <form role="search" className={'d-flex justify-content-center'}>
                {/*<button className="btn btn-outline-success me-3" type="submit" onClick={ (e)=> handleCreateInfrastructure(e)}>Click
                  to Create Infrastructure</button>*/}
                {Cookies.get( 'accessToken' ) ?
                  <Link to="login" className="btn btn-outline-danger" type="submit"
                        onClick={() => Cookies.remove( 'accessToken' )}>Logout</Link>
                  :
                  <Link to="login" className="btn success" type="submit">Login</Link>}
              </form>
            </div>
          </div>
        </nav>
      </header>
      <Outlet/>
      <Icon name='arrow circle up' onClick={() => window.scrollTo( 0, 0 )}
            alt="Page Up"
            title="Page Up"
            className={`up-button ${inDeep ? 'show-up-button' : 'hide-up-button'}`}/>
    </>
  );
};

export default DefaultLayout;
