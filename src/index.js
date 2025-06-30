import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Import Components
import LoginPage from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute"; // Import ProtectedRoute
import Dashboard from "./dashboard/Dashboard";
import PharmaProductPage from "./dashboard/pharmacy/PharmaProductPage";
import EditPharmaProductPage from "./dashboard/pharmacy/EditPharmaProductPage";
import UserPage from "./dashboard/Users";
import AllDoctoresPage from "./dashboard/doctor/AllDoctors";
import AddDoctorPage from "./dashboard/doctor/AddDoctor";
import AllPharmaProductsPage from "./dashboard/pharmacy/AllPharmaProducts";
import AddPharmaProductsPage from "./dashboard/pharmacy/AddPharmaProduct";
import DoctorDetailPage from "./dashboard/doctor/DoctorDetailPage";
import AllHospitalsPage from "./dashboard/hospital/AllHospital";
import AddHospitalPage from "./dashboard/hospital/AddHospital";

// Import Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Dashboard.css";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";
import ResetPasswordPage from "./auth/ResetPasswordPage";
import AppointsPage from "./dashboard/appoint/Appoint";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap everything in the AuthProvider */}
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* <-- Add this route */}
                    <Route path="/reset-password" element={<ResetPasswordPage />} />   {/* <-- Add this route */}

                    {/* Protected Routes: Wrap the element with ProtectedRoute */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/pharma_product"
                        element={
                            <ProtectedRoute>
                                <PharmaProductPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <UserPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/appoint" element={<ProtectedRoute><AppointsPage /></ProtectedRoute>}/>

                    {/* Doctor Routes */}
                    <Route
                        path="/doctors"
                        element={
                            <ProtectedRoute>
                                <AllDoctoresPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-doctor"
                        element={
                            <ProtectedRoute>
                                <AddDoctorPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor/:id"
                        element={
                            <ProtectedRoute>
                                <DoctorDetailPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Pharma Product Routes */}
                    <Route
                        path="/pharma-products"
                        element={
                            <ProtectedRoute>
                                <AllPharmaProductsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-pharma-product"
                        element={
                            <ProtectedRoute>
                                <AddPharmaProductsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/pharma_product/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditPharmaProductPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Hospital Routes */}
                    <Route
                        path="/hospital"
                        element={
                            <ProtectedRoute>
                                <AllHospitalsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-hospital"
                        element={
                            <ProtectedRoute>
                                <AddHospitalPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);