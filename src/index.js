import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import PharmaProductPage from "./dashboard/PharmaProductPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Dashboard.css"; // Load Dashboard Styles
import EditPharmaProductPage from "./dashboard/EditPharmaProductPage";
import UserPage from "./dashboard/Users";
import AllDoctoresPage from "./dashboard/AllDoctors";
import AddDoctorPage from "./dashboard/AddDoctor";
import AllPharmaProductsPage from "./dashboard/AllPharmaProducts";
import AddPharmaProductsPage from "./dashboard/AddPharmaProduct";
import DoctorDetailPage from "./dashboard/DoctorDetailPage";
import AllHospitalsPage from "./dashboard/AllHospital";
import AddHospitalPage from "./dashboard/AddHospital";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pharma_product" element={<PharmaProductPage />} />
                <Route path="/users" element={< UserPage />} />
                {/* Doctor Routes */}
                <Route path="/doctors" element={<AllDoctoresPage />} />
                <Route path="/add-doctor" element={<AddDoctorPage />} />
                <Route path="/doctor/:id" element={<DoctorDetailPage />} />


                {/* Pharma Product Routes */}
                <Route path="/pharma-products" element={<AllPharmaProductsPage />} />
                <Route path="/add-pharma-product" element={<AddPharmaProductsPage />} />
                <Route path="/pharma_product/edit/:id" element={<EditPharmaProductPage />} />
               
                {/* hospital  add  Routes */}
                <Route path="/hospital" element={<AllHospitalsPage />} />
                <Route path="/add-hospital" element={<AddHospitalPage />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
