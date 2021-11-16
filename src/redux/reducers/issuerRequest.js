import * as ActionTypes from '../actions/actionTypes';

//Handle all issuer account requests data
const IssuerRequest = (state = {
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
        case ActionTypes.REQUEST_SUCCESS:
            return {...state,
                info: action.info,
                err: null
            };
        case ActionTypes.REQUEST_FAIL:
            return {...state,
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