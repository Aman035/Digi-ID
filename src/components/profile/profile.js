import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './profile.css';
import {Link} from 'react-router-dom';

const Profile = ()=>{
    return(
        <div className="profile">
            <Link to='/newId'>
            <AddCircleIcon className="newIdbtn" color="primary" 
                sx = {{fontSize : "50px"}}/>
            </Link>
        </div>
    )
}

export default Profile;