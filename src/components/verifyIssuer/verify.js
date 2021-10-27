import React , {useState} from 'react';
import './verify.css';
import Request from './request';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      IssuerRequest : state.IssuerRequest
    }
}

const Verify = (props) => {
    const [reqState , setReqState] = useState(1);
    return(
        <div className = "issuer">
        <h3>Issuer Account Requests Details</h3>
        <div className = 'detail'>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Verifier Account Address</b></div>
                <div className="col-6 col-lg-8">{props.IssuerRequest.info.address}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Accepted Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.IssuerRequest.info.acceptedRequest.length}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Pending Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.IssuerRequest.info.pendingRequest.length}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Rejected Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.IssuerRequest.info.rejectedRequest.length}</div>
            </div>
            <div className="row requestrow">
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={reqState === 2? "contained": "outlined"} color="success" onClick={()=>setReqState(2)}>
                        Accepted Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={reqState === 1? "contained": "outlined"} color="primary" onClick={()=>setReqState(1)}>
                        Pending Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={reqState === 0? "contained": "outlined"} color="error" onClick={()=>setReqState(0)}>
                        Rejected Requests
                    </Button>
                </div>
            </div>
        </div>
        <div>
            {reqState === 0 ?
                <Request 
                    data ={props.IssuerRequest.info.rejectedRequest}
                    owner = {props.IssuerRequest.info.address} />
            :
                <div>
                {reqState === 1 ?
                    <Request 
                        data = {props.IssuerRequest.info.pendingRequest}
                        owner = {props.IssuerRequest.info.address} />
                :
                    <Request 
                        data = {props.IssuerRequest.info.acceptedRequest}
                        owner = {props.IssuerRequest.info.address} />
                }
                </div>
            }
        </div>
    </div>
    )
}
export default connect(mapStateToProps , null)(Verify);