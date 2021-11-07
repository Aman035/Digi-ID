import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Load from '../loading/loading';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './newId.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { connect } from 'react-redux';
import { addId } from '../../redux/actions/user';

const mapstateToProps = state =>{
    return{
        Issuer : state.Issuer,
        User : state.User
    }
}

const mapDispatchToProps = (dispatch) => ({
	addId : (issuer , buffer , account , pbk , id) => dispatch(addId(issuer , buffer , account , pbk , id))
});

const NewId = (props)=>{

    const [load , setLoad] = useState(false);
    const [details , setdetails] = useState({
        identity : {
            id : '',
            address : undefined,
            error : ''
        },
        file :{
            img : '',
            buffer : null,
            error : ''
        }
    })

    const handleChangeId = (event)=>{
        const identity = details.identity;
        identity.id = event.target.value;
        identity.error = '';
        setdetails({...details , identity});
    }

    const handleFile = (event)=>{

        if(event.target.files.length === 0)
        return;

        const file = details.file;
        file.error = '';
        file.img = URL.createObjectURL(event.target.files[0]);

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(event.target.files[0]);
        reader.onloadend = ()=>(
            file.buffer = Buffer(reader.result)
        )
        setdetails({...details , file});
    }

    const handleSubmit = async()=>{
        const identity = details.identity;
        const file = details.file;
        identity.address = props.Issuer.info.get(details.identity.id);
        if(identity.address === undefined || details.file.buffer === null){
            if(identity.address === undefined)
            identity.error = "Identity is Required";
            if(details.file.buffer === null)
            file.error = 'Image is Required';
            setdetails({...details, identity , file});
            return;
        }
        setLoad(true);
        await props.addId(details.identity.address , details.file.buffer, props.User.info.address , props.User.info.publicKey , details.identity.id);
        setLoad(false);
    }

    return(
        <div className="newId">
            {load? <Load/>:null}
            <h3>Add a New Identity</h3>
            <TextField
                id="identity"
                name="identity"
                select
                fullWidth
                size="small"
                label="Select ID"
                value={details.identity.id}
                onChange={handleChangeId}
                error={details.identity.error !== ''}
                >
                {Array.from(props.Issuer.info).map(([key, value]) => {
                    return(
                        <MenuItem key={value} value={key}>
                        {key}
                        </MenuItem>
                    )
                })}
            </TextField>
            {details.identity.error !== ''?
            <div className="error">
                {details.identity.error} 
            </div>
            :null}
            <div>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    type="file"
                    id="buffer"
                    name="buffer"
                    onChange={handleFile}
                    />
                <label htmlFor="buffer">
                    <Button variant="none" component="span" className="upload">
                        Upload ID <FileUploadIcon/>
                    </Button>
                </label> 
            </div>
            {details.file.img !== ''?
                <div>
                    <img src={details.file.img} className="img" alt="ID"/>
                </div>
            :null
            }
            {details.file.error !== ''?
            <div className="error">
                {details.file.error} 
            </div>
            :null}
            <Button
                variant="contained"
                color="primary"
                className="signinBtn"
                onClick = {handleSubmit}
            >
                Add & Request Verification
            </Button>

            <h6 className="note">
                <b>Note : </b>
                All the data is stored on blockchain in an encrypted format using your
                metamask account private key and can only be decrypted by its 
                corrosponding private key.
            </h6>
        </div>
    )
}

export default connect(mapstateToProps , mapDispatchToProps)(NewId);