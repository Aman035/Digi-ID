import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { decrypt,recoverFromSign,deleteId } from '../../redux/actions/user';
import Load from '../loading/loading';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const mapDispatchToProps = dispatch =>({
    decrypt : (msg , account) => dispatch(decrypt(msg , account)),
    deleteId : (num, account) => dispatch(deleteId(num ,account))
})

const Identity = props => {
    const [load , setLoad] = useState(false);
    const [id , setId] = useState("");
    const [signer1 , setSigner1] = useState("");
    const [signer2 , setSigner2] = useState("");

    const history = useHistory();
    useEffect(() => {
        setSigner1(recoverFromSign(props.identity.name , props.identity.ownerSignature));
        const msg = props.identity.name + " : "+ props.identity.owner.toLowerCase();
        setSigner2(recoverFromSign( msg, props.identity.issuerSignature));
    },[props]);

    return(
    <div>
        {load?<Load/>:null}
        <h2 className="pageTitle">ID DETAILS</h2>
        <div className="pad">
            <div className="eachId">
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>ID</b></div>
                    <div className="col-6 col-lg-8">{props.identity.name}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Owner</b></div>
                    <div className="col-6 col-lg-8">{props.identity.owner}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issuer</b></div>
                    <div className="col-6 col-lg-8">{props.identity.issuer}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-12">
                        <Button variant="contained" color="primary" onClick={async ()=>{
                            setLoad(true);
                            const value = await props.decrypt(props.identity.hash , props.identity.owner);
                            setLoad(false);
                            if(value !== undefined)
                            setId(value);
                            }}>
                            Decrypt ID
                        </Button>
                    </div>
                </div>
                <div className="row detailrow">
                    <div className="col-12">
                            <a href={id}  target="_blank" rel="noopener noreferrer">{id}</a>
                    </div>
                </div>
            </div>

            <div className="eachId">
            <h3><u>Owner's Signature Verification</u></h3>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Owner's Signature</b></div>
                    <div className="col-6 col-lg-8">{props.identity.ownerSignature}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Signed Message</b></div>
                    <div className="col-6 col-lg-8">{props.identity.name}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Account Found from Singature Decryption</b></div>
                    <div className="col-6 col-lg-8">{signer1}</div>
                </div>
            </div>

            <div className="eachId">
                <h3><u>Issuer's Signature Verification</u></h3>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Issuer's Signature</b></div>
                    <div className="col-6 col-lg-8">{props.identity.ownerSignature}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Signed Message</b></div>
                    <div className="col-6 col-lg-8">{props.identity.name} : {props.identity.owner.toLowerCase()}</div>
                </div>
                <div className="row detailrow">
                    <div className="col-6 col-lg-4"><b>Account Found from Singature Decryption</b></div>
                    <div className="col-6 col-lg-8">{signer2}</div>
                </div>
            </div>
            
            <div className="row detailrow">
                    <div className="col-12">
                        <Button variant="contained" color="error" onClick={async ()=>{
                            setLoad(true);
                            const val = await props.deleteId(props.identity.num , props.identity.owner);
                            if(val)
                            history.push('/profile');
                            else
                            setLoad(false);
                            }}>
                            Delete ID
                        </Button>
                    </div>
                </div>

        </div>
    </div>
)}
export default connect(null , mapDispatchToProps)(Identity);