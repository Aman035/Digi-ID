import React from 'react';
import './issuer.css';
import NotIssuer from './notIssuer';
import PendingIssuer from './pendingIssuer';
import Issuer from './issuer';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      User : state.User
    }
}

const Profile = (props)=>{
    return (
        <div className="profile">
            {props.User.info.issuer.status === "0"?
                <NotIssuer address={props.User.info.address}/>
                :
                <div>
                    {props.User.info.issuer.status === "1"?
                        <PendingIssuer/>
                        :
                        <Issuer issuer = {props.User.info.issuer}/>
                    }
                </div>
            }
        </div>
    )
}

export default connect(mapStateToProps,null)(Profile);