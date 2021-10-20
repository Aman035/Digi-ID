import * as ActionTypes from '../actions/actionTypes';

const Auth = (state = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        err: null,
        userinfo : null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {...state,
                isLoading : true,
                err : null
            };
        case ActionTypes.SIGNIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.user,
                err: null,
                userinfo : action.info
            };
        case ActionTypes.SIGNIN_FAIL:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                err: action.err,
                userinfo : null
            };
        case ActionTypes.LOGOUT:
            return {...state,
                isAuthenticated: false,
                user: null,
                err: null,
                userinfo : null
            };
        default:
            return state
    }
}
export default Auth;