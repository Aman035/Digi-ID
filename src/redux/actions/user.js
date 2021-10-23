import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';
import { alert} from './alert';

//update user info in redux store
export const updateUserInfo = (account) => async(dispatch)=>{
    dispatch(userinfoLoading());
    try{
        const info = await getUserInfo(account);
        dispatch(userinfoSuccess(info));
    }
    catch(err){
        dispatch(userinfoError(err.message));
    }
}

//get User's Info from blockchain
export const getUserInfo = async(account)=>{

    const info = {
        address : account,
        identity : [],
        registered : false,
        issuer : {
            status : '0',
            description : "",
            id : "",
            pendingRequest : [],
            acceptedRequest : [],
            rejectedRequest : []
        }
    };

    const userData = await Identity.methods.UserDetail(account).call();
    const issuerData = await Identity.methods.IssuerDetail(account).call();
    for( let id = 0; id< userData.IdCount ; id++){
        const identity = await Identity.methods.getId(id , account);
        info.identity.push(identity);
    }
    for( let req = 0; req< issuerData.ReqCount ; req++){
        const request = await Identity.methods.getRequest(req).call();
        
        if(request.Status === '1')
        info.issuer.pendingRequest.push(request);

        if(request.Status === '2')
        info.issuer.acceptedRequest.push(request);

        if(request.Status === '0')
        info.issuer.rejectedRequest.push(request);
    }
    info.registered = userData.Registered;
    info.issuer.status = issuerData.Status;
    info.issuer.description = issuerData.Desc;
    info.issuer.id = issuerData.IssueId;
    return info;
}

export const requestIssuerAccount = 
(account , description , id) => async dispatch =>{
    try{
        await Identity.methods.requestIssuerAccount(description , id).send({from : account});
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
    await dispatch(updateUserInfo(account));
}

const userinfoLoading = ()=>{
    return {
        type : ActionTypes.USERINFO_LOADING
    }
}

const userinfoSuccess = (info)=>{
    return {
        type : ActionTypes.USERINFO_SUCCESS,
        info : info
    };
}

export const userinfoError = (err)=>{
    return {
        type : ActionTypes.USERINFO_FAIL,
        err : err
    }
}
