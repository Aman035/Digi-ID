import React from 'react';
import './design.css';

const Design = ()=>{
    return (
            <div className="design">
                <div className="row crow">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-3 order-md-last">
                        <img alt="identity"  className="customimg" src="/assets/home/id1.jpg"/>
                    </div>
                    <div className="col-12 col-md-6 info ">
                        <h3>A Self Sovereign digital identity solution for all your needs.</h3>
                    </div>
                </div>
                <div className="row crow">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-3 ">
                        <img alt="identity"  className="customimg" src="/assets/home/id2.png"/>
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
            </div>
    )
}
export default Design;