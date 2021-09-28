import React from 'react';
import Animation from '../animation';
import Button from '@material-ui/core/Button';
function design(props){
    return (
        <div>
            <div className="home">
                <Animation/>
                <div>
                <img className="homeimg" alt="identity" src = "/assets/home/home.png"/>
                </div>
                    <div>
                        <Button size="large" 
                            variant="contained" 
                            color="primary" 
                            className = "signin" 
                            onClick = {props.onClick}>
                                {!props.signed?
                                <span>Sign In</span>
                                :<span>Sign Out</span>
                                }
                        </Button>
                    </div>
            </div> 
            <div>
                <div className="row crow">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-3 order-md-last">
                        <img alt="identity"  className="customimg" src="/assets/home/id4.jpg"/>
                    </div>
                    <div className="col-12 col-md-6 info ">
                        <h3>A Self Sovereign digital identity solution for all your needs.</h3>
                    </div>
                    
                </div>
                <div className="row crow">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-3 ">
                        <img alt="identity"  className="customimg" src="/assets/home/id5.png"/>
                    </div>
                    <div className="col-12 col-md-6 info ">
                        <h3>Why carry documents when you can verify yourself online?</h3>
                    </div>
                </div>
                <div className="row crow">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-3 order-md-last">
                        <img alt="identity" className="customimg" src="/assets/home/id3.png"/>
                    </div>
                    <div className="col-12 col-md-6 info order-md-3">
                        <h3>No need to worry about identity theft with the privacy of blockchain.</h3>
                    </div>
                    
                </div>
                <div className="crow"></div>
            </div>
        </div>
    )
}
export default design;