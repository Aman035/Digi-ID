import * as ActionTypes from './actionTypes';
import detectEthereumProvider from '@metamask/detect-provider'

//try connecting to metamask wallet and get account address
export const getAccount = ()=>async(dispatch)=>{

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
                checkUser(account[0]);
        }
    }       
}

//check user is existing or new from blockchain data
const checkUser = ()=>{
    
}

//register the new user
const newUser = ()=>{

}

//
const signin = ()=>{

}

const loading = ()=>(dispatch)=>{
    dispatch(()=>{ 
        return {
            type : ActionTypes.LOADING
    }});
}

const signinSuccess = (user , info)=>(dispatch)=>{
    dispatch(()=>{ 
        return {
            type : ActionTypes.SIGNIN_SUCCESS,
            user : user,
            info : info
    }});
}

const signinError = (err)=>{
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