import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';

//update all issuers info in redux store
export const updateIssuerInfo = () => async (dispatch) => {
    dispatch(issuerLoading());
    try{
        const info = await getIssuerInfo();
        dispatch(issuerSuccess(info));
    }
    catch(err){
        dispatch(issuerError(err.message));
    }

}
//get all issuers data from blockchain
const getIssuerInfo = async()=>{
    const issuerCnt = await Identity.methods.getTotalIssuers().call();
    const issuers = [];
    for(let i = 0;i< issuerCnt ;i++){
        const issuer = await Identity.methods.Issuer(i).call();
        issuers.push(issuer);
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
