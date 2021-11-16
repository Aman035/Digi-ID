import * as ActionTypes from './actionTypes';
import { alert } from './alert';
import Identity from '../../Identity';
import Store from '../store';
var _ = require('lodash');

//update all issuer account requests info in redux store
export const updateRequestInfo = () => async dispatch => {
    try{
        const info = await getRequestInfo();
        const state = Store.getState();
        //don't update state if it is same as previous
        if(! _.isEqual(state.IssuerRequest.info, info))
        dispatch(requestSuccess(info));
    }
    catch(err){
        dispatch(requestError(err.message));
    }
}

export const AcceptIssuerAccount = (rqNo, account) => async dispatch => {
    try{
        await Identity.methods.verifyIssuerAccount(rqNo).send({from : account});
        dispatch(alert("Request Accepted" , "success"));
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

export const RejectIssuerAccount = (rqNo, account) => async dispatch => {
    try{
        await Identity.methods.rejectIssuerAccount(rqNo).send({from : account});
        dispatch(alert("Request Rejected" , "success"));
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

const requestUtil = async(info , req)=>{
    const request = {};
    //data cleaning
    const reqData = await Identity.methods.IssuerVerificationRequest(req).call();
    request.requestNo = req;
    request.status = reqData.Status;
    request.address = reqData.Owner;
    request.id = reqData.Id;
    request.desc = reqData.Desc;
    request.status === '0' ? info.rejectedRequest.push(request) : (request.status === '1' ? info.pendingRequest.push(request) : info.acceptedRequest.push(request));          
    return info;
}

//get all request data from blockchain
const getRequestInfo = async()=>{
    let info = {
        address : "",
        pendingRequest : [],
        acceptedRequest : [],
        rejectedRequest : []
    };

    info.address = await Identity.methods.Owner().call();

    for( let req = 0;1;req++){
        try{info = await requestUtil(info , req);}
        catch(err){break;}
    }
    return info;
}

const requestSuccess = info => ({
    type : ActionTypes.REQUEST_SUCCESS,
    info : info
})

const requestError = err => ({
    type : ActionTypes.REQUEST_FAIL,
    err : err
})

export const changeTab = tab => ({
    type : ActionTypes.REQUEST_TAB_CHANGE,
    tab : tab
})
