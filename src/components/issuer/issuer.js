import React ,{useState} from 'react';
import Request from './request';
import './issuer.css';
import Button from '@mui/material/Button';

const Issuer = (props)=>{
    const [reqState , setReqState] = useState(1);
    return (
        <div className = "issuer">
            <h3>Issuer Account Details</h3>
            <div className = 'detail'>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issued ID</b></div>
                    <div className="col-6 col-lg-8">{props.issuer.id}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issuer & ID Description</b></div>
                    <div className="col-6 col-lg-8">{props.issuer.description}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Accepted ID Verification Requests</b></div>
                    <div className="col-6 col-lg-8">{props.issuer.acceptedRequest.length}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Pending ID Verification Requests</b></div>
                    <div className="col-6 col-lg-8">{props.issuer.pendingRequest.length}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Rejected ID Verification Requests</b></div>
                    <div className="col-6 col-lg-8">{props.issuer.rejectedRequest.length}</div>
                </div>
                <div className="row requestrow">
                    <div className="col-12 col-lg-4 p-2">
                        <Button variant="contained" color="success" onClick={()=>setReqState(2)}>
                            Accepted Requests
                        </Button>
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                        <Button variant="contained" color="primary" onClick={()=>setReqState(1)}>
                            Pending Requests
                        </Button>
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                        <Button variant="contained" color="error" onClick={()=>setReqState(0)}>
                            Rejected Requests
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {reqState === 0 ?
                    <Request data ={props.issuer.rejectedRequest} />
                :
                    <div>
                    {reqState === 1 ?
                        <Request data = {props.issuer.pendingRequest} />
                    :
                        <Request data = {props.issuer.acceptedRequest} />
                    }
                    </div>
                }
            </div>
        </div>
    )
}

export default Issuer;