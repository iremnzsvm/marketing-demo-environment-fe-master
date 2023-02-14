import { lazy } from 'react';
import Loader from './Loader/Loader';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
const LoginButton = lazy(() => import('./LoginButton/LoginButton'));
/*import Message from './Message/Message';
import InformationMessage from './InformationMessage/InformationMessage';
import BuggyCounter from './BuggyCounter/BuggyCounter';
const Input = lazy(() => import('./Elements/Input/Input'));*/

export {
  Loader,
  ErrorBoundary,
  LoginButton
};
