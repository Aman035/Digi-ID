import * as ActionTypes from '../actions/actionTypes';

//Handle all user data
const User = (state = {
        loading: false,
        info: null,
        err: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.USERINFO_LOADING:
            return {...state,
                loading : true,
                err : null
            };
        case ActionTypes.USERINFO_SUCCESS:
            return {...state,
                loading: false,
                info: action.info,
                err: null
            };
        case ActionTypes.USERINFO_FAIL:
            return {...state,
                loading: false,
                err: action.err
            };
        default:
            return state
    }
}
export default User;