import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Auth from './reducers/auth';
import Issuer from './reducers/issuer';

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth : Auth,
            Issuer : Issuer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}

export default ConfigureStore;