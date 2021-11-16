import * as ActionTypes from '../actions/actionTypes';

//Handle all user data
const User = (state = {
        info: {
            address: "",
            identity: [],
            issuer: {
                status: '0', 
                description: '', 
                id: '', 
                pendingRequest: [], 
                acceptedRequest: [],
                rejectedRequest : [],
            },
            publicKey: "",
            registered: false,
        },
        err: null,
        tab : 1
    }, action) => {
    switch (action.type) {
        case ActionTypes.USERINFO_SUCCESS:
            return {...state,
                info: action.info,
                err: null
            };
        case ActionTypes.USERINFO_FAIL:
            return {...state,
                err: action.err
            };
        case ActionTypes.USERINFO_TAB_CHANGE:
            return {...state,
                tab : action.tab
            };
        default:
            return state
    }
}
export default User;