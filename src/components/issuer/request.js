import React from 'react';
import './request.css';
import EachReq from './eachReq';

const Request = props => (
    <div className="request">
        {props.data.length === 0?
        <h4>No Requests Found</h4>
        :
        <div>
            {props.data.map( each =>(
                <EachReq req = {each} key = {each.requestNo} id={props.id}/>
            ))}
        </div>    
        }
    </div>
)
export default Request;