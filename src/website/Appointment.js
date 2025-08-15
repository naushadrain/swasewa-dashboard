import React from 'react';
import doctorImg from '../image/dr image.jpg';       // keep if your file has a space
import calendarImg from '../image/Calender.png';     // adjust spelling/path if needed
import '../styles/appointment.css';

function Appointment() {
    return (
        <section id="appointment">
            <div className="container main-container">
                <div className="row w-100 align-items-center justify-content-between g-4">

                    {/* Left Text Area */}
                    <div className="col-12 col-md-6 info-section order-2 order-md-1 text-center text-md-start">
                        <h2>
                            Book An Online Appointment<br />
                            with specialized doctors<br />
                            through app
                        </h2>

                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                        </p>

                        <p><span className="check-icon">✔</span> Easy Online Schedule Here</p>
                        <p><span className="check-icon">✔</span> Online/Offline consultation anytime</p>

                        <button className="get-app-btn mt-3" type="button">
                            GET AN APP
                        </button>
                    </div>

                    {/* Right Image + Calendar */}
                    <div className="col-12 col-md-6 d-flex justify-content-center order-1 order-md-2">
                        <div className="image-wrapper">
                            <img src={doctorImg} className="doctor-img" alt="Doctor" />

                            {/* Overlay calendar (uses imported image for reliable bundling) */}
                            <div
                                className="card calendar bg-light shadow-sm"
                                style={{ backgroundImage: `url(${calendarImg})` }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Appointment;
