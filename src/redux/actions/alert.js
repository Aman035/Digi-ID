import * as ActionTypes from './actionTypes';
import { ALERT_DELAY } from '../../helper';

export const alert = (message , severity)=>async(dispatch)=>{
    dispatch(addAlert(message , severity));
    await setTimeout(function(){ dispatch(resetAlert()) }, ALERT_DELAY);
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
