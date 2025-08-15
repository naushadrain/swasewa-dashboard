import React from 'react';
import logo from '../image/logo/weblogo.png';
function Footer() {
  return (
    <footer className="footer mt-5" aria-label="Site footer">
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Contact Info */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              {/* If your logo is in /public/image/logo/weblogo.png */}
              <img
                src={logo}
                width={160}
                height={60}
                className="me-2"
                alt="Swasewa logo"
              />
              {/* <div>
                <h5 className="m-0 fw-bold text-primary">swasewa</h5>
                <small className="text-muted">forever care anywhere</small>
              </div> */}
            </div>
            <div className="contact-info">
              <p className="mb-1"><i className="bi bi-telephone-fill me-2" aria-hidden="true"></i>(201) 555-0124</p>
              <p className="mb-1"><i className="bi bi-envelope-fill me-2" aria-hidden="true"></i>swasewa@example.com</p>
              <p className="mb-0"><i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>6391 Elgin St. Celina, Delaware 10299</p>
            </div>
          </div>

          {/* About Company */}
          <div className="col-md-3">
            <h6>About Company</h6>
            <ul className="list-unstyled">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#specialist">Our Specialist</a></li>
              <li><a href="#appointment">Book an Appointment</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="col-md-3">
            <h6>Help & Support</h6>
            <ul className="list-unstyled">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-2 d-flex align-items-start justify-content-md-end gap-3 social-icons">
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
              <i className="bi bi-twitter-x" aria-hidden="true"></i>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom mt-4 text-center">
          ©{new Date().getFullYear()} swasewa — All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
