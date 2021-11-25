import * as ActionTypes from './actionTypes';
import { alert } from './alert';
import Identity from '../../Identity';
import Store from '../store';
import ipfs from '../../ipfs';
import web3 from '../../web3';
var ethUtil = require('ethereumjs-util');
var sigUtil = require('eth-sig-util');
var _ = require('lodash');

//update user info in redux store
export const updateUserInfo = (account) => async(dispatch)=>{
    try{
        const info = await getUserInfo(account);
        const state = Store.getState();
        if(! _.isEqual(info , state.User.info))
        dispatch(userinfoSuccess(info));
    }
    catch(err){
        dispatch(userinfoError(err.message));
    }
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

export const acceptRequest = (num , account ,id) => async dispatch => {
   
    try{
        const msg = id + " : " + account.toLowerCase(); 
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

export const decrypt = (msg , account) => async dispatch => {
    try{
        const decrypted = await window.ethereum.request({
            method: 'eth_decrypt',
            params: [msg, account],
        });
        return "https://ipfs.io/ipfs/" + decrypted;
    }
    catch(err){
        dispatch(alert(err.message , "error"));
    }
}

export const deleteId = (num,account) => async dispatch => {
    try{
        await Identity.methods.deleteId(num).send({from : account});
        return true;
    }
    catch(err){
        dispatch(alert(err.message , "error"));
        return false;
    }
}

export const recoverFromSign = (msg,sign) => {
    if(sign === "Rejected")
    return "Issuer Has Rejected this Identity";

    if(sign === "Pending")
    return "Issuer Signature in still Pending";

    return web3.eth.accounts.recover(msg , sign);
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

export const changeTab = tab => ({
    type : ActionTypes.USERINFO_TAB_CHANGE,
    tab : tab
})
