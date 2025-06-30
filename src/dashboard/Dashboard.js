import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Dashboard.css";
import Sidebar from "./temp/Sidebar";
import TopNavbar from "./temp/TopNavbar";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if (auth.currentUser) {
            setUserEmail(auth.currentUser.email);
        }
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navbar */}
            <TopNavbar />

            {/* Layout Container */}
            <div className="dashboard-container d-flex">
                {/* Sidebar */}
                <div className="sidebar bg-light shadow-sm">
                    <Sidebar activePath={location.pathname} />



                </div>

                {/* Main Content */}
                <div className="main-content p-4 w-100">
                    <h4 className="mb-4 fw-bold">Dashboard Overview</h4>
                    <div className="row">
                        {[
                            { title: "Total Users", icon: "fa-users", color: "primary" },
                            { title: "New Messages", icon: "fa-envelope", color: "success" },
                            { title: "Active Sessions", icon: "fa-signal", color: "info" },
                            { title: "Errors", icon: "fa-exclamation-triangle", color: "danger" },
                            { title: "New Signups", icon: "fa-user-plus", color: "warning" },
                            { title: "Revenue", icon: "fa-dollar", color: "secondary" },
                        ].map((item, i) => (
                            <div className="col-md-4 mb-4" key={i}>
                                <div className={`card border-${item.color} shadow-sm`}>
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="text-muted">{item.title}</h6>
                                            <h4 className="fw-bold">{Math.floor(Math.random() * 1000)}</h4>
                                        </div>
                                        <i className={`fa ${item.icon} fa-2x text-${item.color}`}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
