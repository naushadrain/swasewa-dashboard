import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (!email) {
            setError('Please enter your email address.');
            setLoading(false);
            return;
        }

        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length === 0) {
                setError('This email is not registered. Please sign up or use a different email.');
                setLoading(false);
                return;
            }

            await sendPasswordResetEmail(auth, email);
            setMessage('✅ A password reset link has been sent to your email. Please check your inbox (and spam folder).');
        } catch (err) {
            setError('❌ Failed to send reset email. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row full-screen">
                {/* Image Section (Same as LoginPage) */}
                <div className="col-lg-6 col-md-6 col-12 p-0 image-container">
                    <img src="/img/login2.jpg" alt="Forgot Password" className="img-fluid w-100 h-100" />
                </div>

                {/* Form Section */}
                <div className="col-lg-6 col-md-6 col-12 box d-flex align-items-center justify-content-center">
                    <div className="login-form w-75 p-4 shadow-lg rounded bg-white">
                        <h3 className="mb-4 text-center">Forgot Password</h3>
                        <p className="text-center text-muted mb-4">Enter your registered email to receive a password reset link.</p>
                        
                        {message && <div className="alert alert-success">{message}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {/* Hide form if the message is success to prevent resending */}
                        {!message && (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        )}

                        <div className="text-center mt-3">
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;