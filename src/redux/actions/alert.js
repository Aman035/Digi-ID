import * as ActionTypes from './actionTypes';

export const alert = (message , severity)=>async(dispatch)=>{
    dispatch(addAlert(message , severity));
    await setTimeout(function(){ dispatch(resetAlert()) }, 6000);
}

const addAlert = (message , severity)=>{
    return {
        type : ActionTypes.ADD_ALERT,
        message : message,
        severity : severity
    };
}

export const resetAlert = ()=>{
    return {
        type : ActionTypes.RESET_ALERT
    }
}
