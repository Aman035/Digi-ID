import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';
import {alert} from './alert';

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

//update all issuer account requests info in redux store
export const updateRequestInfo = () => async dispatch => {
    dispatch(requestLoading());
    try{
        const info = await getRequestInfo();
        dispatch(requestSuccess(info));
    }
    catch(err){
        dispatch(requestError(err.message));
    }
    await delay(10000);
    dispatch(updateRequestInfo());
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

    let request = {
        requestNo : 0,
        address : "",
        status : "",
        desc : "",
        id : ""
    }

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
        try{
            info = await requestUtil(info , req);
        }
        catch(err){
            break;
        }
    }
    return info;
}

const requestLoading = ()=>{
    return {
        type : ActionTypes.REQUEST_LOADING
    }
}

const requestSuccess = (info)=>{
    return {
        type : ActionTypes.REQUEST_SUCCESS,
        info : info
    };
}

const requestError = (err)=>{
    return {
        type : ActionTypes.REQUEST_FAIL,
        err : err
    }
}
