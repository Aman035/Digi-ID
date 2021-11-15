import React from 'react';
import './verify.css';
import Request from './request';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { changeTab } from '../../redux/actions/issuerRequest';

const mapStateToProps = state => {
    return {
      IssuerRequest : state.IssuerRequest
    }
}
const mapDispatchToProps = dispatch => ({
    changeTab : (tab)=>dispatch(changeTab(tab))
});

const Verify = (props) => {
    return(
        <div className = "verifier">
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
                    <Button variant={props.IssuerRequest.tab === 2? "contained": "outlined"} color="success" onClick={()=>props.changeTab(2)}>
                        Accepted Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={props.IssuerRequest.tab === 1? "contained": "outlined"} color="primary" onClick={()=>props.changeTab(1)}>
                        Pending Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={props.IssuerRequest.tab === 0? "contained": "outlined"} color="error" onClick={()=>props.changeTab(0)}>
                        Rejected Requests
                    </Button>
                </div>
            </div>
        </div>
        <div>
            {props.IssuerRequest.tab === 0 ?
                <Request 
                    data ={props.IssuerRequest.info.rejectedRequest}
                    owner = {props.IssuerRequest.info.address} />
            :
                <div>
                {props.IssuerRequest.tab === 1 ?
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
export default connect(mapStateToProps , mapDispatchToProps)(Verify);