import * as ActionTypes from './actionTypes';
import Identity from '../../Identity';

//update all issuer account requests info in redux store
export const updateRequestInfo = () => async (dispatch) => {
    dispatch(requestLoading());
    try{
        const info = await getRequestInfo();
        dispatch(requestSuccess(info));
    }
    catch(err){
        dispatch(requestError(err.message));
    }
}

//get all request data from blockchain
const getRequestInfo = async()=>{
    const info = {
        address : "",
        pendingRequest : [],
        acceptedRequest : [],
        rejectedRequest : []
    };

    const request = {
        requestNo : 0,
        address : "",
        status : "",
        desc : "",
        id : ""
    }

    info.address = await Identity.methods.Owner().call();
    return info;
}

const requestLoading = ()=>{
    return {
        type : ActionTypes.REQUEST_LOADING
    }
}

const requestSuccess = (info)=>{
    return {
        type : ActionTypes.REQUEST_SUCCESS,
        info : info
    };
}

const requestError = (err)=>{
    return {
        type : ActionTypes.REQUEST_FAIL,
        err : err
    }
}
