import React from 'react';
import './home.css';
import Animation from './animation';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { trySignin } from '../../redux/actions/auth';
import Design from './design';

const mapStateToProps = state => ({
    Auth : state.Auth
}) 

const mapDispatchToProps = dispatch => ({
    signIn : ()=>dispatch(trySignin())
})

const Home = props => (
    <div>
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
        </div>
        <Design/>
    </div>
)
export default connect(mapStateToProps, mapDispatchToProps)(Home);