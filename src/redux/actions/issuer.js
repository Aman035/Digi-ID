import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';

//all issuer related functions

//get all issuers
export const getIssuers = async()=>(dispatch)=>{

}

//checks an account is issuer or not
export const IsIssuer = async(account)=>{
    try{
        const Issuer = await Identity.method.IssuerDetail(account).call();
        Issuer.Status === 2 ? true : false;
    }
    catch(err){
        return false;
    }
    
}

const issuerLoading = ()=>{
    return {
        type : ActionTypes.LOADING
    }
}

const issuerSuccess = (info)=>{
    return {
        type : ActionTypes.ISSUER_SUCCESS,
        info : info
    };
}

const issuerFail = (err)=>{
        return {
            type : ActionTypes.ISSUER_FAIL,
            err : err
    }
}
