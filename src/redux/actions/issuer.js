import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

//update all issuers info in redux store
export const updateIssuerInfo = () => async (dispatch) => {
    dispatch(issuerLoading());
    try{
        const info = await getIssuerInfo(0 ,[]);
        dispatch(issuerSuccess(info));
    }
    catch(err){
        dispatch(issuerError(err.message));
    }
    await delay(10000);
    dispatch(updateIssuerInfo());

}
//get all issuers data from blockchain
const getIssuerInfo = async(num , issuers)=>{
    try{
        const issuer = await Identity.methods.Issuer(num).call();
        issuers.push(issuer);
        return await getIssuerInfo(num+1 , issuers);
    }
    catch(err){
        return issuers;
    }
}

const issuerLoading = ()=>{
    return {
        type : ActionTypes.ISSUER_LOADING
    }
}

const issuerSuccess = (info)=>{
    return {
        type : ActionTypes.ISSUER_SUCCESS,
        info : info
    };
}

const issuerError = (err)=>{
    return {
        type : ActionTypes.ISSUER_FAIL,
        err : err
    }
}
