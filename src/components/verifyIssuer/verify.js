import React from 'react';
import Request from './request';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { changeTab } from '../../redux/actions/issuerRequest';

const mapStateToProps = state => ({
    request : state.IssuerRequest.info,
    tab : state.IssuerRequest.tab
})

const mapDispatchToProps = dispatch => ({
    changeTab : tab =>dispatch(changeTab(tab))
});

const Verify = (props) => {
    return(
        <div>
        <h2 className="pageTitle">
            Issuer Account Requests Details
        </h2>
        <div className = 'detail'>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Verifier Account Address</b></div>
                <div className="col-6 col-lg-8">{props.request.address}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Accepted Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.request.acceptedRequest.length}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Pending Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.request.pendingRequest.length}</div>
            </div>
            <div className="row detailrow">
                <div className="col-6 col-lg-4"><b>Rejected Verification Requests</b></div>
                <div className="col-6 col-lg-8">{props.request.rejectedRequest.length}</div>
            </div>
            <div className="row requestrow">
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={props.tab === 2? "contained": "outlined"} color="success" onClick={()=>props.changeTab(2)}>
                        Accepted Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={props.tab === 1? "contained": "outlined"} color="primary" onClick={()=>props.changeTab(1)}>
                        Pending Requests
                    </Button>
                </div>
                <div className="col-12 col-lg-4 p-2">
                    <Button variant={props.tab === 0? "contained": "outlined"} color="error" onClick={()=>props.changeTab(0)}>
                        Rejected Requests
                    </Button>
                </div>
            </div>
        </div>
        <div>
            {props.tab === 0 ?
                <Request 
                    data ={props.request.rejectedRequest}
                    owner = {props.request.address} />
            :
                <div>
                {props.tab === 1 ?
                    <Request 
                        data ={props.request.pendingRequest}
                        owner = {props.request.address} />
                :
                    <Request 
                        data ={props.request.acceptedRequest}
                        owner = {props.request.address} />
                }
                </div>
            }
        </div>
    </div>
    )
}
export default connect(mapStateToProps , mapDispatchToProps)(Verify);