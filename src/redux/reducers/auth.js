import * as ActionTypes from '../actions/actionTypes';

const Auth = (state = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errMess: null,
        userinfo : null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {...state,
                isLoading : true
            };
        case ActionTypes.SIGNIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.user,
                errMess: null,
                userinfo : action.info
            };
        case ActionTypes.SIGNIN_FAIL:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                errMess: action.err,
                userinfo : null
            };
        case ActionTypes.LOGOUT:
            return {...state,
                isAuthenticated: false,
                user: null,
                errMess: null,
                userinfo : null
            };
        default:
            return state
    }
}
export default Auth;