import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './loading.css';

const Loading = ()=>(
    <div className = "load">
        <div className = "center">
            <CircularProgress />
        </div>
    </div>
)
export default Loading;