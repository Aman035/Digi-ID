import React, { useState } from 'react';
import './home.css';
import AlertComp from '../alert';
import Animation from './animation';
import { connect } from 'react-redux';
import {Button} from '@mui/material';
import { trySignin } from '../../redux/actions/auth';
const mapStateToProps = state => {
    return {
      Auth : state.Auth
    }
}
const mapDispatchToProps = (dispatch) => ({
    signIn : ()=>dispatch(trySignin())
});

const Home = (props)=>{

    return(
        <div className="home">
            <Animation/>
            <div className="title">
                <h1 className="homeTitle1">DIGI ID</h1>
                <h4 className="homeTitle2">Identity management solutions for a modern world</h4>
            </div>
            {!props.Auth.isAuthenticated?
                <Button variant = "outlined" color="primary" className="signinBtn" onClick = {props.signIn}>
                    <h5>Sign In</h5>
                </Button>
            :
            null}
            {/* {newUser?
                <AlertComp message= "New User Account Detected" severity="info"/>
            :
            null} */}
            {props.Auth.err?
                <AlertComp message={props.Auth.err} severity="error"/>
            :
            null}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);