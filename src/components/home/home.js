import React from 'react';
import './home.css';
import { connect } from 'react-redux';
import Animation from './animation';
import {Button} from '@mui/material'

const Home = ()=>{
    return(
        <div className="home">
            <Animation/>
            <div className="title">
                <h1 className="homeTitle1">DIGI ID</h1>
                <h4 className="homeTitle2">Identity management solutions for a modern world</h4>
            </div>
            <Button variant = "outlined" color="primary" className="signinBtn">
                <h5>Sign In</h5>
            </Button>
        </div>
    )
}

export default Home;