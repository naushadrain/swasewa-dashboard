import React from 'react';

function GetInTuch() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send the form somewhere
    // e.g., fetch('/api/contact', { method: 'POST', body: new FormData(e.target) })
  };

  return (
    <section id="contact" className="pt-4">
      {/* Heading */}
      <div className="services-section mt-4">
        <div className="services-title text-center">
          <h1>
            <span className="blue"></span>{' '}
            <span className="gradient-text">Contact Us</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container form-section">
        <div className="row g-4">
          {/* Left Info Panel */}
          <div className="col-md-5 left-panel d-flex flex-column justify-content-center text-start text-dark">
            <h2 className="mb-2">We are already ready to help you!</h2>
            <p className="mb-4">We are always there to help you</p>

            <h6 className="fw-bold">Phone number</h6>
            <p>+91 9898999343</p>

            <h6 className="fw-bold">Email</h6>
            <p>swaewa@gmail.com</p>

            <h6 className="fw-bold">Address</h6>
            <p>
              85-40-4/4, S1, Sri Shaswatha Nivas,<br />
              JN Road, Rajahmundry, East Godavari,<br />
              Andhra Pradesh, India, 533101
            </p>
          </div>

          {/* Right Form Panel */}
          <div className="col-md-7 right-panel">
            <h3 className="fw-bold mb-4">Any Queries?</h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Your First Name *</label>
                  <input type="text" className="form-control" placeholder="First Name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your Last Name *</label>
                  <input type="text" className="form-control" placeholder="Last Name" required />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Your Email Id *</label>
                  <input type="email" className="form-control" placeholder="Email address" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your Phone number *</label>
                  <input type="tel" className="form-control" placeholder="Phone number" required />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Your Profession</label>
                  <input type="text" className="form-control" placeholder="Profession" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your Address</label>
                  <input type="text" className="form-control" placeholder="Address" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Your File (JPG, PNG, PDF, etc.)</label>
                <div className="input-group">
                  <input type="file" className="form-control" />
                  <button className="btn btn-outline-primary btn-upload" type="button">
                    Upload File
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea className="form-control" rows="4" placeholder="Leave us a message..." required></textarea>
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" id="privacyCheck" type="checkbox" required />
                <label className="form-check-label" htmlFor="privacyCheck">
                  You agree to our friendly privacy policy.
                </label>
              </div>

              <button type="submit" className="submit-btn btn btn-primary">
                SUBMIT NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetInTuch;
