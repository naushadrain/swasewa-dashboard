import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

// Helper function to get query params from URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const query = useQuery();
    const oobCode = query.get('oobCode');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!oobCode) {
            setError("Invalid or missing password reset code. Please request a new link.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage("✅ Password has been reset successfully! You can now log in with your new password.");
            setTimeout(() => {
                navigate('/login');
            }, 4000);
        } catch (err) {
            setError("❌ Failed to reset password. The link may have expired or is invalid. Please try again. ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row full-screen">
                {/* Image Section (Same as LoginPage) */}
                <div className="col-lg-6 col-md-6 col-12 p-0 image-container">
                    <img src="/img/login2.jpg" alt="Reset Password" className="img-fluid w-100 h-100" />
                </div>

                {/* Form Section */}
                <div className="col-lg-6 col-md-6 col-12 box d-flex align-items-center justify-content-center">
                    <div className="login-form w-75 p-4 shadow-lg rounded bg-white">
                        <h3 className="mb-4 text-center">Create New Password</h3>
                        
                        {message && <div className="alert alert-success">{message}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {!message && ( // Hide form after success
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="new-password">New Password</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm-password">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        )}
                        {message && (
                            <div className="text-center mt-3">
                               <Link to="/login" className="btn btn-secondary">Go to Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;