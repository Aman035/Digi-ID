import * as ActionTypes from '../actions/actionTypes';

//Handle all user data
const IssuerRequest = (state = {
        loading: false,
        info: null,
        err: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LOADING:
            return {...state,
                loading : true,
                err : null
            };
        case ActionTypes.REQUEST_SUCCESS:
            return {...state,
                loading: false,
                info: action.info,
                err: null
            };
        case ActionTypes.REQUEST_FAIL:
            return {...state,
                loading: false,
                err: action.err
            };
        default:
            return state
    }
}
export default IssuerRequest;