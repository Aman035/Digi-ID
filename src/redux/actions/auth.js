import * as ActionTypes from './actionTypes';
import detectEthereumProvider from '@metamask/detect-provider'
import Identity from '../../Identity';
import { alert } from './alert';
import { updateUserInfo } from './user';
import { updateRequestInfo } from './issuerRequest';
import { updateIssuerInfo } from './issuer';

//try connecting to metamask wallet and get account address
export const trySignin = ()=>async(dispatch)=>{

    dispatch(authLoading());

    let err = "";
    const provider = await detectEthereumProvider();

    if(provider == null)
        err = "Metamask Not Installed";
    else{
        if(provider !== window.ethereum)
            err = "We Think Multiple Wallets are connected. Please disable other wallets.";
    }

    if(err !== ""){
        dispatch(authError(err));
        dispatch(alert(err , "error"));
        return;
    }

    try{
        await window.ethereum.request({ method: 'eth_requestAccounts'})
    }
    catch(err){
        dispatch(authError("Can't Connect To MetaMask"));
        dispatch(alert("Can't Connect To MetaMask" , "error"));
        return;
    }

    let account = await window.ethereum.request({ method: 'eth_accounts' });

    try{
        const newUser = await checkNewUser(account[0]);
        console.log(newUser);
        if(newUser === true){
            dispatch(alert("New User Account Detected" , "info"));
            await dispatch(signUp(account[0]));
        }
        else{
            await dispatch(signIn(account[0]));
        }
    }
    catch(err){
        dispatch(authError(err.message));
        dispatch(alert(err.message , "error"));
    }
        
}

//check user is existing or new from blockchain data
const checkNewUser = async(account)=>{
    const User = await Identity.methods.UserDetail(account).call();
    return User.Registered ? false : true;
}

//register the new user
const signUp = (account) => async (dispatch)=>{
    const publicKey = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account], // you must have access to the specified account
    });
    await Identity.methods.registerUser(publicKey).send({from : account});
    await dispatch(signIn(account));
}

//signin user
const signIn = (account)=>async(dispatch)=>{
    //Some Fancy Auth Method
    dispatch(updateUserInfo(account));
    dispatch(updateIssuerInfo());
    dispatch(updateRequestInfo());
    dispatch(authSuccess(account));
    dispatch(alert("Sign In Successfull" , "success"));
}

const authLoading = ()=>{
    return {
        type : ActionTypes.AUTH_LOADING
    }
}

const authSuccess = (user)=>{
    return {
        type : ActionTypes.AUTH_SUCCESS,
        user : user
    };
}

const authError = (err)=>{
    return {
        type : ActionTypes.AUTH_FAIL,
        err : err
    }
}

export const authLogout = ()=>{
    return{
        type : ActionTypes.AUTH_LOGOUT
    }
}