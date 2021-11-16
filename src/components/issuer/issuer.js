import React from 'react';
import Request from './request';
import './issuer.css';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { changeTab } from '../../redux/actions/user';

const mapStateToProps = state => ({
    issuer : state.User.info.issuer,
    tab : state.User.tab
})
const mapDispatchToProps = dispatch => ({
    changeTab : (tab) => dispatch(changeTab(tab))
})

const Issuer = props => (
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
                    <Request data ={props.issuer.rejectedRequest} id={props.issuer.id}/>
                :
                    <div>
                    {props.tab === 1 ?
                        <Request data = {props.issuer.pendingRequest} id={props.issuer.id}/>
                    :
                        <Request data = {props.issuer.acceptedRequest} id={props.issuer.id}/>
                    }
                    </div>
                }
            </div>
        </div>
)

export default connect(mapStateToProps ,mapDispatchToProps)(Issuer);