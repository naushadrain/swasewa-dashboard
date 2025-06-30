import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Removed unused sendPasswordResetEmail
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom"; // <-- SOLUTION: Import Link here
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
// Modal, Button, and Form are no longer needed if you removed the modal
// import { Modal, Button, Form } from "react-bootstrap"; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // The 'successMessage' state can be removed if it's only for the reset password flow
  // const [successMessage, setSuccessMessage] = useState(""); 
  const [touched, setTouched] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password || !validateEmail(email)) {
      setTouched({ email: true, password: true });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The alert can be removed for a better user experience since you navigate right away
      // alert("✅ Login Successful!"); 
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("❌ Login Failed! " + error.message);
    }
  };

  // All modal-related states and functions can be removed from this component
  // as they now live in the ForgotPasswordPage.js component.

  return (
    <div className="container-fluid">
      <div className="row full-screen">
        {/* Image Section */}
        <div className="col-lg-6 col-md-6 col-12 p-0 image-container">
          <img src="/img/login2.jpg" alt="Login" className="img-fluid w-100 h-100" />
        </div>

        {/* Login Form Section */}
        <div className="col-lg-6 col-md-6 col-12 box d-flex align-items-center justify-content-center">
          <div className="login-form w-75 p-4 shadow-lg rounded bg-white">
            <h3 className="mb-4 text-center">Login</h3>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            {/* You can remove the successMessage display as it's not set here anymore */}
            {/* {successMessage && <p className="text-success">{successMessage}</p>} */}

            <form noValidate onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${touched.email && (!email || !validateEmail(email)) ? "is-invalid" : ""}`}
                  id="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  required
                />
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${touched.password && !password ? "is-invalid" : ""}`}
                  id="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  required
                />
                <div className="invalid-feedback">Password is required.</div>
              </div>

              {/* Remember / Forgot */}
              <div className="mb-3 form-check d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;