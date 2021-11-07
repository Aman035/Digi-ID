import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { acceptRequest , rejectRequest, decrypt } from '../../redux/actions/user'; 
import { connect } from 'react-redux';
import Load from '../loading/loading';

const mapStateToProps = state => {
    return {
      User : state.User
    }
}

const mapDispatchToProps = (dispatch) => ({
	acceptIssuerAccount : (rqNo , account) => dispatch(acceptRequest(rqNo , account)),
	rejectIssuerAccount : (rqNo , account) => dispatch(rejectRequest(rqNo , account)),
});

const EachReq = (props)=>{
    const [Id , setId] = useState(undefined);
    const [load , setLoad] = useState(false);

    return(
        <div className = {props.req.status === "0"?"req cl3" : (props.req.status === "1"? "req cl2" : "req cl1")}>
            {load?<Load/>:null}
            <div className="row p-2">
                <div className="col-6 col-lg-4"><b>Owner's Address</b></div>
                <div className="col-6 col-lg-8">{props.req.owner}</div>
            </div>
            <div className="row p-2">
                <div className="col-6 col-lg-4"><b>Identity Hash</b></div>
                <div className="col-6 col-lg-8">{props.req.hash}</div>
            </div>
            {Id!==undefined?
            <div className="row p-2">
                <div className="col-6 col-lg-4"><b>Identity</b></div>
                <div className="col-6 col-lg-8"><a href={Id} target="blank">{Id}</a></div>
            </div>
            :null}
            <div className="row p-2">
                <div className="col-12">
                <Button className="reqBtn" variant="contained" color="info"
                    onClick={async()=>{const decypted = await decrypt(props.req.hash ,props.User.info.address); setId(decypted);}}>
                    Decrypt ID
                </Button>
                </div>
            </div>
            {props.req.status === "1"?
            <div className="row p-2">
                <div className="col-0 col-lg-8"/>
                <div className="col-12 col-lg-4">
                    <Button className="reqBtn" variant="contained" color="success" onClick={async ()=>{
                        setLoad(true);
                        await props.acceptIssuerAccount(props.req.requestNo ,props.User.info.address);
                        setLoad(false)}}>
                        Accept
                    </Button>
                    <Button className="reqBtn" variant="contained" color="error" onClick={async ()=>{
                        setLoad(true);
                        await props.rejectIssuerAccount(props.req.requestNo ,props.User.info.address);
                        setLoad(false);
                        }}>
                        Reject
                    </Button>
                </div>
            </div>
            :
            null}
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(EachReq);