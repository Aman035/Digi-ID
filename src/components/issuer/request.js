import React from 'react';

const Request = (props) => {
    return (
        <div>
            {props.data.length === 0?
            <h4>No Requests Found</h4>
            :
            null
            }
        </div>
    )
}
export default Request;