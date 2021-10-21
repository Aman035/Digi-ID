import * as ActionTypes from '../actions/actionTypes';

//Handle user authentication
const Auth = (state = {
        loading: false,
        isAuthenticated: false,
        user : null,
        err: null,
    }, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_LOADING:
            return {...state,
                loading : true,
                err : null
            };
        case ActionTypes.AUTH_SUCCESS:
            return {...state,
                loading: false,
                isAuthenticated: true,
                user: action.user,
                err: null,
            };
        case ActionTypes.AUTH_FAIL:
            return {...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                err: action.err,
            };
        
        case ActionTypes.AUTH_LOGOUT:
            return {...state,
                isAuthenticated: false,
                user: null,
                err: null
            };
        default:
            return state
    }
}
export default Auth;