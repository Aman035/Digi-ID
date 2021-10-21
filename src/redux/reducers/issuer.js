import * as ActionTypes from '../actions/actionTypes';

//Handle all issuers data
const Issuer = (state = {
        loading: false,
        info: [],
        err: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.ISSUER_LOADING:
            return {...state,
                loading : true,
                err : null
            };
        case ActionTypes.ISSUER_SUCCESS:
            return {...state,
                loading: false,
                info: action.info,
                err: null
            };
        case ActionTypes.ISSUER_FAIL:
            return {...state,
                loading: false,
                err: action.err
            };
        default:
            return state
    }
}
export default Issuer;