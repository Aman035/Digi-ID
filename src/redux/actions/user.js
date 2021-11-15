import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';
import { alert} from './alert';
import { REFRESH_RATE } from '../../helper';
import ipfs from '../../ipfs';
import web3 from '../../web3';
var ethUtil = require('ethereumjs-util');
var sigUtil = require('eth-sig-util');

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

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
    await delay(REFRESH_RATE);
    dispatch(updateUserInfo(account));
}

//get User's Info from blockchain
export const getUserInfo = async(account)=>{

    let info = {
        address : account,
        identity : [],
        registered : false,
        publicKey : '',
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
    info.identity = await getIds(0 , account , []);
    info = await getRequests(0 , account , info);
    info.registered = userData.Registered;
    info.publicKey = userData.PublicKey;
    info.issuer.status = issuerData.Status;
    info.issuer.description = issuerData.Desc;
    info.issuer.id = issuerData.IssueId;
    return info;
}

const getIds = async(num , account , ids)=>{
    try{
        
        const identity = await Identity.methods.getId(num , account).call();
        const Id = {
            num : num,
            name : identity.Name,
            hash : identity.Hash,
            owner : identity.Owner,
            issuer : identity.Issuer,
            ownerSignature : identity.OwnerSignature,
            issuerSignature : identity.IssuerSignature
        }
        ids.push(Id);
        return await getIds(num+1 , account , ids);
    }
    catch(err){
        return ids;
    } 
}

const getRequests = async(num ,account , info)=>{
    try{
        let rqData = await Identity.methods.getRequest(num).call({from : account});
        const request = {
            requestNo : num,
            owner : '',
            hash : '',
            status : ''
        }
        request.status = rqData.Status;
        request.owner = rqData.Owner;
        request.hash = rqData.Hash;

        if(request.status === "1")
        info.issuer.pendingRequest.push(request);

        if(request.status === "2")
        info.issuer.acceptedRequest.push(request);

        if(request.status === "0")
        info.issuer.rejectedRequest.push(request);

        return await getRequests(num+1 , account , info);
    }
    catch(err){
        return info;
    }
}

export const requestIssuerAccount = 
(account , description , id) => async dispatch =>{
    try{
        await Identity.methods.requestIssuerAccount(description , id).send({from : account});
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

export const addId = (issuer , buffer , account , pbk,id) => async dispatch =>{
    try{
        const res = await ipfs.files.add(buffer);
        const hash = res[0].hash;

        const sign = await web3.eth.personal.sign(id , account);

        const encrypted_IPFS_hash = ethUtil.bufferToHex(
        Buffer.from(
            JSON.stringify(
            sigUtil.encrypt(
                pbk,
                { data: hash},
                'x25519-xsalsa20-poly1305'
            )
            ),
            'utf8'
        )
        );
        
        const Issuer_Data = await Identity.methods.UserDetail(issuer).call();
        const encrypted_issuer_hash = ethUtil.bufferToHex(
        Buffer.from(
            JSON.stringify(
            sigUtil.encrypt(
                Issuer_Data.PublicKey,
                { data: hash},
                'x25519-xsalsa20-poly1305'
            )
            ),
            'utf8'
        )
        );

        await Identity.methods.newId(encrypted_IPFS_hash , issuer , sign , encrypted_issuer_hash).send({from : account});
    }
    catch(err){
        dispatch(alert(err.message , 'error'));
    }
}

export const acceptRequest = (num , account) => async dispatch => {
   
    try{
        const msg = "Verified Identity#" + num; 
        const sign = await web3.eth.personal.sign(msg , account);
        await Identity.methods.AcceptIdRequest(num , sign).send({from : account});
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

export const rejectRequest = (num , account) => async dispatch => {

    try{
        await Identity.methods.RejectIdRequest(num).send({from : account});
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

export const decrypt = async(msg , account) => {
    const decrypted = await window.ethereum.request({
        method: 'eth_decrypt',
        params: [msg, account],
    });
    return "https://ipfs.io/ipfs/" + decrypted;
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
