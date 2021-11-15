import * as ActionTypes from '../actions/actionTypes';

//Handle all user data
const IssuerRequest = (state = {
        loading: false,
        info: {
            address: "",
            acceptedRequest:[],
            pendingRequest: [],
            rejectedRequest: []
        },
        err: null,
        tab : 1
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
        case ActionTypes.REQUEST_TAB_CHANGE:
            return {...state,
                tab: action.tab
            };
        default:
            return state
    }
}
export default IssuerRequest;