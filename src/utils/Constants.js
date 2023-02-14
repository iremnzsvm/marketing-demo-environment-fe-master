import React from 'react';
import config from '../config/index';
import APIs from '../network/apis/APIs';
/*import Swal from 'sweetalert2';
import _ from 'lodash';
import withReactContent from 'sweetalert2-react-content';
import MobileDetect from 'mobile-detect';*/
// import { setAuthToken } from '../store/auth';

//const testDetect = new MobileDetect(window.navigator.userAgent);
//window.testDetect = testDetect;

export const isMobile = (() => window.innerWidth < 991)();

//const MySwal = withReactContent(Swal);

/*export const Alert = ({ message }) => {
  MySwal.fire({
    title: <p>{message}</p>,
    // footer: 'Copyright 2018',
    didOpen: () => {
      // MySwal.clickConfirm()
    },
  });
};*/

export const priceFormat = ( value ) => {
  if (!value) {
    return 0;
  }

  return parseFloat( value )
    .toFixed( 2 )
    .replace( '.', ',' )
    .replace( /\B(?=(\d{3})+(?!\d))/g, '.' );
};


/*export const redirectLoginPage = async () => {
  const { data } = await APIs.checkCreateSession();
  if (data?.result?.checkCreateSession) {
    const response = await APIs.createSession();
    const isSuccess = _.get(response, 'data.result.result', false);

    if (isSuccess === 'SUCCESS') {
     // Store.dispatch(setAuthToken(response.data.session.sessionId));
    }
  } else {
    window.location.href = config?.LOGIN_URL;
  }
};*/

export const checkValidationEmail = ( val ) => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test( val );

export const requestPayload = {
  language: 'tr',
  clientKey: '0F01AB61-E194-4245-BA81-AFDFCD697CC4',
  clientVersion: '15',
  operatingSystem: 'iOS',
};

export const addUniquely = ( array, item ) => {
  if (array.indexOf( item ) === -1) {
    array.push( item );
  } else {
    array.push( array.splice( array.indexOf( item ), 1 )[0] );
  }
  return array;
};
