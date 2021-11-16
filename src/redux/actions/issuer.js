import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';
import Store from '../store';
var _= require('lodash');

//update all issuers info in redux store
export const updateIssuerInfo = () => async (dispatch) => {
    try{
        const issuers = new Map();
        const info = await getIssuerInfo(0 ,issuers);
        const state = Store.getState();
        if(! _.isEqual(state.Issuer.info , info))
        dispatch(issuerSuccess(info));
    }
    catch(err){
        dispatch(issuerError(err.message));
    }
}

//get all issuers data from blockchain
const getIssuerInfo = async(num , issuers)=>{
    try{
        const issuerData = await Identity.methods.Issuer(num).call();
        issuers.set(issuerData.IssueId,issuerData.IssuerAddress);
        return await getIssuerInfo(num+1 , issuers);
    }
    catch(err){
        return issuers;
    }
}

const issuerSuccess = info => ({
    type : ActionTypes.ISSUER_SUCCESS,
    info : info
})

const issuerError = err => ({
    type : ActionTypes.ISSUER_FAIL,
    err : err
})
