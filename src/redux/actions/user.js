import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';

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

    const Info = await Identity.methods.UserDetail(account).call();
    const identity = [];
    for( let i = 0; i< Info.IdCount ; i++){
        const id = await Identity.methods.getId(i , account);
        identity.push(id);
    }
    const issuer = await Identity.methods.IssuerDetail(account).call();
    const requests = [];
    for( let i = 0; i< issuer.ReqCount ; i++){
        const request = await Identity.methods.getRequest(i).call();
        requests.push(request);
    }
    Info.identity = identity;
    issuer.Requests = requests;
    Info.issuer = issuer;
    return Info;
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
