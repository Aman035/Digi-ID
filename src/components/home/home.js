import React from 'react';
import './home.css';
import { connect } from 'react-redux';
import Animation from './animation';
import {Button} from '@mui/material';
import {getAccount} from '../../redux/actions/auth';
const mapStateToProps = state => {
    return {
      Auth : state.Auth
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAccount : ()=>dispatch(getAccount())
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
            <Button variant = "outlined" color="primary" className="signinBtn" onClick = {props.getAccount}>
                <h5>Sign In</h5>
            </Button>
            :
            null}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);