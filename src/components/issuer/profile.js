import React from 'react';
import './issuer.css';
import NotIssuer from './notIssuer';
import PendingIssuer from './pendingIssuer';
import Issuer from './issuer';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      Auth : state.Auth
    }
}

const Profile = (props)=>{
    return (
        <div className="issuer">
            {props.Auth.userinfo.issuer.Status === "0"?
                <NotIssuer/>
                :
                <div>
                    {props.Auth.userinfo.issuer.Status === "1"?
                        <PendingIssuer/>
                        :
                        <Issuer/>
                    }
                </div>
            }
        </div>
    )
}

export default connect(mapStateToProps,null)(Profile);