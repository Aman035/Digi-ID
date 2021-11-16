import * as ActionTypes from '../actions/actionTypes';

//Handle all issuers data
const Issuer = (state = {
        info: new Map(),
        err: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.ISSUER_SUCCESS:
            return {...state,
                info: action.info,
                err: null
            };
        case ActionTypes.ISSUER_FAIL:
            return {...state,
                err: action.err
            };
        default:
            return state
    }
}
export default Issuer;