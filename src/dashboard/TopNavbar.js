import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const TopNavbar = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm sticky-top" style={{ zIndex: 1050 }}>
      <div className="d-flex align-items-center w-100 justify-content-between">
        <h4 className="text-white fw-bold mb-0">SWASEWA</h4>
        <div className="d-flex align-items-center gap-3 text-white">
          <i className="fa fa-bell position-relative">
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle"></span>
          </i>
          <i className="fa fa-envelope"></i>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle text-white" data-bs-toggle="dropdown">
              <i className="fa fa-user-circle me-1"></i> {userEmail || "Admin"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
