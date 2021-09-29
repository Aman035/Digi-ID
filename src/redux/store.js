import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Auth from './reducers/auth';

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth : Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}

export default ConfigureStore;