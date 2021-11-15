import React from 'react';
import Button from '@mui/material/Button';
import './identity.css';

const Identity = (props)=>{
    return(
        <div className = 'identity'>
            <h3>Identity Details</h3>
            <div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Name</b></div>
                    <div className="col-6 col-lg-8">{props.identity.name}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Owner</b></div>
                    <div className="col-6 col-lg-8">{props.identity.owner}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Owner's Signature</b></div>
                    <div className="col-6 col-lg-8">{props.identity.ownerSignature}</div>
                    <div className="col-6 col-lg-4">
                        <Button variant="contained" color="primary" onClick={()=>{}}>
                            Verify Signature
                        </Button>
                    </div>
                    <div className="col-6 col-lg-8">Logic</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issuer</b></div>
                    <div className="col-6 col-lg-8">{props.identity.issuer}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issuer's Signature</b></div>
                    <div className="col-6 col-lg-8">{props.identity.issuerSignature}</div>
                    <div className="col-6 col-lg-4">
                        <Button variant="contained" color="primary" onClick={()=>{}}>
                            Verify Signature
                        </Button>
                    </div>
                    <div className="col-6 col-lg-8">Logic</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Identity Hash</b></div>
                    <div className="col-6 col-lg-8">{props.identity.hash}</div>
                    <div className="col-6 col-lg-4">
                        <Button variant="contained" color="primary" onClick={()=>{}}>
                            Decrypt Hash
                        </Button>
                    </div>
                    <div className="col-6 col-lg-8">Logic</div>
                </div>
                <div className="row p-5">
                    <div className="col-12">
                        <Button variant="contained" color="error" onClick={()=>{}}>
                            Delete Id
                        </Button>
                    </div>
                </div>
                {/* <div className="row requestrow">
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
                </div> */}
            </div>
        </div>
    )
}
export default Identity;