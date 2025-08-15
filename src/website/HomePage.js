import React from 'react';
import logo from '../image/logo/weblogo.png'; 
import '../styles/website.css';
function HomePage() {
  
  return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light rounded-pill  px-4 py-2 my-4 container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Our Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="terms.html">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        
  );

}
export default HomePage;
