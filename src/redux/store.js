import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import User from './reducers/user';
import Auth from './reducers/auth';
import Alert from './reducers/alert';
import Issuer from './reducers/issuer';
import IssuerRequest from './reducers/issuerRequest';
// import logger from 'redux-logger';

const store = createStore(
  combineReducers({
    User: User,
    Auth: Auth,
    Alert: Alert,
    Issuer: Issuer,
    IssuerRequest: IssuerRequest
  }),
  applyMiddleware(thunk)
);

export default store;