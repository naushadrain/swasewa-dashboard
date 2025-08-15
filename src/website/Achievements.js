import React, { PureComponent } from 'react';
import vector from '../image/Vector.svg';
import layer1 from '../image/layer1.png';
import Group from '../image/Group.svg';
function Achievements() {
    return (
        // <!-- Achievement Section -->
        <div className="container achievement-section">
            <div className="row justify-content-center">
                <div className="col-4">
                    <h2 className="achievement-title">We Speck with our Achievement & Powerful Status</h2>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <hr className="vertical-gradient-line" />
                </div>
                <div className="col-md-2 achievement-box">
                    <img src={vector} className="icon-img" alt="Icon" />
                    <h3>50K+</h3>
                    <p>Active Installation</p>
                </div>

                <div className="col-md-2 achievement-box">
                    <img src={layer1} className="icon-img" alt="Icon" />
                    <h3>5K+</h3>
                    <p>5 Star Feedback</p>
                </div>

                <div className="col-md-2 achievement-box">
                    <img src={Group} className="icon-img" alt="Icon" />
                    <h3>10K+</h3>
                    <p>All Time Downloads</p>
                </div>
            </div>
        </div>
    );
}

export default Achievements;