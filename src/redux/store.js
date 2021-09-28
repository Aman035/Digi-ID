import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}

export default ConfigureStore;