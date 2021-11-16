import React from 'react';
import './issuer.css';
import NotIssuer from './notIssuer';
import PendingIssuer from './pendingIssuer';
import Issuer from './issuer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    User : state.User
})

const Profile = props => (
    <div className="profile">
        {props.User.info.issuer.status === "0"?
            <NotIssuer address={props.User.info.address}/>
            :
            <div>
                {props.User.info.issuer.status === "1"?
                    <PendingIssuer/>
                    :
                    <Issuer/>
                }
            </div>
        }
    </div>
)
export default connect(mapStateToProps,null)(Profile);