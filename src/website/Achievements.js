// src/website/Achievements.jsx
import React from 'react';
import vector from '../image/Vector.svg';
import layer1 from '../image/layer1.png';
import group from '../image/Group.svg';
import '../styles/achievement.css';
export default function Achievements() {
    return (
        <section className="achievement-section"> {/* full width background here */}
            <div className="container">
                <div className="row align-items-start justify-content-center g-4">
                    {/* Title */}
                    <div className="col-12 col-lg-4 text-center text-lg-start">
                        <h2 className="achievement-title m-0">
                            We Speak with our Achievement & Powerful Status
                        </h2>
                    </div>

                    {/* Vertical line (desktop only) */}
                    <div className="d-none d-lg-flex col-lg-1 justify-content-center">
                        <span className="vertical-gradient-line" />
                    </div>

                    {/* Stat cards */}
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="achievement-box">
                            <img src={vector} className="icon-img" alt="Active Installation" />
                            <h3>50K+</h3>
                            <p>Active Installation</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="achievement-box">
                            <img src={layer1} className="icon-img" alt="5 Star Feedback" />
                            <h3>5K+</h3>
                            <p>5 Star Feedback</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="achievement-box">
                            <img src={group} className="icon-img" alt="All Time Downloads" />
                            <h3>10K+</h3>
                            <p>All Time Downloads</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
