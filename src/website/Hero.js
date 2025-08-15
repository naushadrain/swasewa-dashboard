import React, { PureComponent } from 'react';
import image1 from '../image/Mobile app store badge.svg';
import image2 from '../image/Mobile app store badge (1).svg';
import image3 from '../image/avatar.png';
import image4 from '../image/bannerlogo.png';

import '../styles/hero.css';
function Hero() {
    return (
            // banner 
    <section className="hero-section container">
        <div className="hero-container">
            <div className="row mx-4 mt-0 mb-0">
                <div className="col-lg-6">
                    <div className="hero-left">
                        <h1 className="hero-title">
                            <span className="highlight"> Your Health,</span><br />
                            <span className="highlight"> One Tap Away</span>
                        </h1>
                        <p className="hero-subtext">
                            Providing compassionate care with modern<br />
                            technology & trusted professionals
                        </p>

                        <div className="hero-download">
                            <span className="download-label">Get the app</span>
                            <img src={image1} alt="App Store" className="store-btn" />
                            <img src={image2} alt="Google Play" className="store-btn" />
                        </div>

                        <div className="hero-users">
                            <img src={image3} alt="Users" className="avatars" />
                            <span className="user-count"><strong>+25,000 Users</strong><br />Downloaded our app</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 d-flex justify-content-end">
                    <div className="hero-right">
                        <img src={image4} alt="App Preview" className="w-100" />
                    </div>
                </div>

            </div>
        </div>
    </section>
    );
}

export default Hero;