import React, { useState } from 'react';
import './request.css';
import Button from '@mui/material/Button';
import { AcceptIssuerAccount , RejectIssuerAccount } from '../../redux/actions/issuerRequest'; 
import { connect } from 'react-redux';
import Load from '../loading/loading';

const mapDispatchToProps = (dispatch) => ({
	AcceptIssuerAccount : (rqNo , owner) => dispatch(AcceptIssuerAccount(rqNo , owner)),
	RejectIssuerAccount : (rqNo , owner) => dispatch(RejectIssuerAccount(rqNo  ,owner)),
});

const Request = (props) => {
    const [load , setLoad] = useState(false);

    return (
        <div className="request">
            {load?<Load/>:null}
            {props.data.length === 0?
            <h4>No Requests Found</h4>
            :
            <div>
                {props.data.map( each =>(
                    <div key = {each.requestNo} 
                    className = {each.status === "0"?"req cl3" : (each.status === "1"? "req cl2" : "req cl1")}>
                        <div className="row p-2">
                            <div className="col-6 col-lg-4"><b>Account Address</b></div>
                            <div className="col-6 col-lg-8">{each.address}</div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6 col-lg-4"><b>Issued ID</b></div>
                            <div className="col-6 col-lg-8">{each.id}</div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6 col-lg-4"><b>Issuer & ID Description</b></div>
                            <div className="col-6 col-lg-8">{each.desc}</div>
                        </div>
                        {each.status === "1"?
                        <div className="row p-2">
                        <div className="col-0 col-lg-8"/>
                            <div className="col-12 col-lg-4">
                                <Button className="reqBtn" variant="contained" color="success" onClick={async ()=>{
                                    setLoad(true);
                                    await props.AcceptIssuerAccount(each.requestNo,props.owner);
                                    setLoad(false)}}>
                                    Accept
                                </Button>
                                <Button className="reqBtn" variant="contained" color="error" onClick={async ()=>{
                                    setLoad(true);
                                    await props.RejectIssuerAccount(each.requestNo , props.owner);
                                    setLoad(false);
                                    }}>
                                    Reject
                                </Button>
                            </div>
                        </div>
                        :
                        null}
                    </div>
                ))

                }
            </div>
            }
        </div>
    )
}
export default connect(null , mapDispatchToProps)(Request);