import * as ActionTypes from '../actions/actionTypes';

//Handle all global alerts
const Alert = (state = {
        message : null,
        severity : null
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ALERT:
            return {...state,
                message : action.message,
                severity : action.severity
            };
        case ActionTypes.RESET_ALERT:
            return {...state,
                message : null,
                severity : null
            };
        default:
            return state
    }
}
export default  Alert;