import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './profile.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';

const mapstateToProps = state => ({
    id : state.User.info.identity
})

const Profile =  props =>(
    <div>
        <h2 className="pageTitle">IDENTITIES</h2>
        {props.id.length > 0?
            <div className = "row m-0 pad">
                {props.id.map( each => (
                    <div key={each.num} className="col-sx-12 col-md-6 col-lg-4 id">
                        <Card num={each.num} name={each.name} key={each.num}/>
                    </div>
                ))}
            </div>:
            <div>
                <img className="noIdImg" src="/assets/profile/noID.gif" alt="No ID Found" height = "50%"/>
                <h4>No ID Found</h4>
            </div>
            
        }
        
        <Link to='/newId'>
        <AddCircleIcon className="newIdbtn" color="primary" 
            sx = {{fontSize : "50px"}}/>
        </Link>
    </div>
)

export default connect(mapstateToProps , null)(Profile);