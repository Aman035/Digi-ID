import * as ActionTypes from '../actions/actionTypes';

//contains all the list of issuers
const Issuer = (state = {
        isLoading: false,
        issuerinfo: null,
        err: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.ISSUER_LOADING:
            return {...state,
                isLoading : true,
                err : null
            };
        case ActionTypes.ISSUER_SUCCESS:
            return {...state,
                isLoading: false,
                issuerinfo: action.info,
                err: null
            };
        case ActionTypes.ISSUER_FAIL:
            return {...state,
                isLoading: false,
                issuerinfo: null,
                err: action.err
            };
        default:
            return state
    }
}
export default Issuer;