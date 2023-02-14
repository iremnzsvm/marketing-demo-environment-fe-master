import { axiosDefault, axiosEmpty, axiosInstance, axiosInstanceDefault, axiosInstanceLogin } from './index';
import config from '../../config/index';

const handlerEnabled = false;

// getInfrastructureList
const getEnvironmentList = async () => {
  const response = await axiosInstance.get( `/infrastructures` );
  return response;
};

// deleteInfrastructure
const deleteInfrastructure = async ( params ) => {
  const response = await axiosInstance.delete( `/infrastructures/${params}` );
  return response;
};

// updateInfrastructure
const updateInfrastructure = async ( params ) => {
  const response = await axiosInstance.put( `/infrastructures/${params.name}`, params );
  return response;
};


// runInfrastructure
const runEnvironment = async ( params ) => {
  const response = await axiosInstance.post( `/infrastructures`, params );
  return response;
};

// postOperation
const postOperation = async ( params ) => {
  const response = await axiosInstance.post( `/operations/${params.name}`);
  return response;
};

// getOperation
const getOperationStatus = async ( params ) => {
  const response = await axiosInstance.get( `/operations/${params.name}/status`);
  return response;
};

// deleteOperation
const deleteOperation = async ( params ) => {
  const response = await axiosInstance.delete( `/operations/${params.name}`, params );
  return response;
};

// sendUserInformations
const sendUserInformations = async ( params ) => {
  const response = await axiosEmpty.post( `/login/oauth2/code/google`, params );
  return response;
};

// createSession
const createSession = async ( params ) => {
  const response = {
    data: {
      refreshToken: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFVkFNLVNFUlZJQ0UtTEFZRVIiLCJpYXQiOjE2NTY1ODQyNTgsImV4cCI6MTY3MjEzNjg1OCwidG9rZW5UeXBlIjoiUkVGUkVTSCIsInRva2VuQ2xhaW1zIjp7InVzZXJJZCI6MTksInVzZXJBbGlhcyI6InRhaGlyIiwicHJpdmlsZWdlcyI6bnVsbH19.FG6eGJjFib65vtLnWl9PYfYQle0nEKMM8YiKoEkm_rs",
      accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFVkFNLVNFUlZJQ0UtTEFZRVIiLCJpYXQiOjE2NTY1ODQyNTgsImV4cCI6MTY1NjY3MDY1OCwidG9rZW5UeXBlIjoiQUNDRVNTIiwidG9rZW5DbGFpbXMiOnsidXNlcklkIjoxOSwidXNlckFsaWFzIjoidGFoaXIiLCJwcml2aWxlZ2VzIjpudWxsfX0.6cg7BHWnX8Nj5Wwh3lKnTu1oo5iKQQrcJGYKKEqsQgM",
      message: ""
    },
    status: 200,
    statusText: "",
    headers: {
      cacheControl: "no-cache, no-store, max-age=0, must-revalidate",
      contentLength: 565,
      contentType: "application/json",
      expires: 0,
      pragma: "no-cache"
    },
    config: {
      transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false},
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {"FormData": null},
      headers: {"Accept": "application/json, text/plain, */*", "Content-Type": "application/json"},
      baseURL: "https://dev.em.api-evam.com",
      handlerEnabled: false,
      method: "post",
      url: "service-layer/authenticate/evam-login",
      data: "{\"username\":\"evamdemo\",\"password\":\"Evam!12345\"}"
    },
    request: {}
  };
  if (params.userName && params.password) {
    if (params.userName == 'evamdemo' && params.password == 'Evam!12345') {
      response.data.message = 'Sign in successful';
    } else {
      response.data.accessToken = '';
      response.data.message = 'Check your password or username';
    }
    //const response = await axiosInstance.post('service-layer/authenticate/evam-login', { username: params.userName, password: params.password }, { handlerEnabled });
    return response;
  }
};

export default {
  createSession,
  getEnvironmentList,
  runEnvironment,
  deleteInfrastructure,
  sendUserInformations,
  getOperationStatus,
  deleteOperation,
  postOperation,
  updateInfrastructure
};
