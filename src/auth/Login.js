import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      alert("✅ Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("❌ Login Failed! " + error.message);
    }
  };

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

            <form noValidate onSubmit={handleLogin}>
              {/* Email */}
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
                />
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>

              {/* Password */}
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
                />
                <div className="invalid-feedback">Password is required.</div>
              </div>

              {/* Remember / Forgot */}
              <div className="mb-3 form-check d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                {/* <a href="/forgot" className="forgot-password">Forgot Password?</a> */}
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
