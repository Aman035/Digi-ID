import * as ActionTypes from './actionTypes';
import detectEthereumProvider from '@metamask/detect-provider'
import Identity from '../../Identity';

//try connecting to metamask wallet and get account address
export const trySignin = ()=>async(dispatch)=>{

    dispatch(loading());
    const provider = await detectEthereumProvider();
    if(provider == null){
        dispatch(signinError("Metamask Not Installed"));
    }
    else{
        if(provider !== window.ethereum){
            dispatch(signinError("We Think Multiple Wallets are connected. Please disable other wallets."));
        }
        else{
                try{
                    await window.ethereum.request({ method: 'eth_requestAccounts'})
                }
                catch(err){
                    dispatch(signinError("Can't Connect To MetaMask"));
                    return;
                }
            
                let account = await window.ethereum.request({ method: 'eth_accounts' });
                await checkNewUser(account[0]) ? dispatch(signUp(account[0])) : dispatch(signIn(account[0]));
        }
    }       
}

//check user is existing or new from blockchain data
const checkNewUser = async(account)=>{
    try{
        const User = await Identity.methods.UserDetail(account).call();
        return User.Registered ? false : true;
    }
    catch(err){
        return false;
    }
}

//register the new user
const signUp = (account) => async (dispatch)=>{
    try{
        await Identity.methods.registerUser().send({from : account});
        dispatch(signIn(account));
    }
    catch(err){
        dispatch(signinError(err.message));
    }
}

//get User's Info
const getUserInfo = async(account)=>{
    const Info = await Identity.methods.UserDetail(account).call();
    const identity = [];
    for( let i = 0; i< Info.IdCount ; i++){
        const id = await identity.methods.getId(i , account);
        identity.push(id);
    }
    Info.identity = identity;
    return Info;
}

//signin user
const signIn = (account)=>async(dispatch)=>{
    try{
        const info = await getUserInfo(account);
        dispatch(signinSuccess(account , info));
    }
    catch(err){
        dispatch(signinError(err.message));
    }
    
}

const loading = ()=>{
    return {
        type : ActionTypes.LOADING
    }
}

const signinSuccess = (user , info)=>{
    return {
        type : ActionTypes.SIGNIN_SUCCESS,
        user : user,
        info : info
    };
}

export const signinError = (err)=>{
        return {
            type : ActionTypes.SIGNIN_FAIL,
            err : err
    }
}

export const logout = ()=>{ 
        return {
            type : ActionTypes.LOGOUT
    };
}