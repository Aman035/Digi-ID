import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './profile.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';

const mapstateToProps = state =>{
    return{
        User : state.User
    }
}

const Profile = (props)=>{
    return(
        <div className="profile">
            <h3>All Identities</h3>
            <div className = "ids row m-0">
                {props.User.info.identity.map( each => (
                    <div key={each.num} className="col-sx-12 col-md-6 id">
                     <Card num={each.num} name={each.name} key={each.num}/>
                    </div>
                ))}
            </div>
            <Link to='/newId'>
            <AddCircleIcon className="newIdbtn" color="primary" 
                sx = {{fontSize : "50px"}}/>
            </Link>
        </div>
    )
}

export default connect(mapstateToProps , null)(Profile);