import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Auth from './reducers/auth';
import User from './reducers/user';
import Issuer from './reducers/issuer';
import Alert from './reducers/alert';

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth : Auth,
            User : User,
            Issuer : Issuer,
            Alert : Alert
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}

export default ConfigureStore;