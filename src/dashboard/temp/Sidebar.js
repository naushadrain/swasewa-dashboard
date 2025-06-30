import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activePath }) => {
  return (
    <div className="sidebar bg-light shadow-sm">
      <ul className="sidebar-menu list-unstyled mt-3">
        {/* Dashboard */}
        <li className={activePath === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <i className="fa fa-home me-2"></i> Dashboard
          </Link>
        </li>

        {/* Doctor Dropdown */}
        <li>
          <a
            data-bs-toggle="collapse"
            href="#doctorMenu"
            role="button"
            aria-expanded={["/doctors", "/add-doctor"].includes(activePath)}
            aria-controls="doctorMenu"
            className="d-flex align-items-center justify-content-between"
          >
            <span><i className="fa fa-user-md me-2"></i> Doctor</span>
            <i className="fa fa-chevron-down"></i>
          </a>
          <ul
            className={`collapse list-unstyled ps-3 mt-2 ${["/doctors", "/add-doctor"].includes(activePath) ? "show" : ""
              }`}
            id="doctorMenu"
          >
            <li className={activePath === "/doctors" ? "active" : ""}>
              <Link to="/doctors">All Doctors</Link>
            </li>
            <li className={activePath === "/add-doctor" ? "active" : ""}>
              <Link to="/add-doctor">Add Doctor</Link>
            </li>
          </ul>
        </li>

        {/* Pharma Product Dropdown */}
        <li>
          <a
            data-bs-toggle="collapse"
            href="#pharmaMenu"
            role="button"
            aria-expanded={["/pharma-products", "/add-pharma-product"].includes(activePath)}
            aria-controls="pharmaMenu"
            className="d-flex align-items-center justify-content-between"
          >
            <span><i className="fa fa-medkit me-2"></i> Pharma Product</span>
            <i className="fa fa-chevron-down"></i>
          </a>
          <ul
            className={`collapse list-unstyled ps-3 mt-2 ${["/pharma-products", "/add-pharma-product"].includes(activePath) ? "show" : ""
              }`}
            id="pharmaMenu"
          >
            <li className={activePath === "/pharma-products" ? "active" : ""}>
              <Link to="/pharma-products">All Products</Link>
            </li>
            <li className={activePath === "/add-pharma-product" ? "active" : ""}>
              <Link to="/add-pharma-product">Add Product</Link>
            </li>
          </ul>
        </li>

        {/* Hospital Menu */}
        <li>
          <a
            data-bs-toggle="collapse"
            href="#hospitalMenu"
            role="button"
            aria-expanded={["/hospital", "/add-hospital"].includes(activePath)}
            aria-controls="hospitalMenu"
            className="d-flex align-items-center justify-content-between"
          >
            <span><i className="fa fa-h-square me-2"></i> Hospital</span>
            <i className="fa fa-chevron-down"></i>
          </a>
          <ul
            className={`collapse list-unstyled ps-3 mt-2 ${["/hospital", "/add-hospital"].includes(activePath) ? "show" : ""
              }`}
            id="hospitalMenu"
          >
            <li className={activePath === "/hospital" ? "active" : ""}>
              <Link to="/hospital">All Hospitals</Link>
            </li>
            <li className={activePath === "/add-hospital" ? "active" : ""}>
              <Link to="/add-hospital">Add Hospital</Link>
            </li>
          </ul>
        </li>

        {/* Appoints */}
        <li className={activePath === "/appoint" ? "active" : ""}>
          <Link to="/appoint"><i className="fa fa-users me-2"></i> Appoints</Link>
        </li>


        {/* Users */}
        <li className={activePath === "/users" ? "active" : ""}>
          <Link to="/users"><i className="fa fa-users me-2"></i> Users</Link>
        </li>

        {/* Settings */}
        <li className={activePath === "/settings" ? "active" : ""}>
          <Link to="/settings"><i className="fa fa-cog me-2"></i> Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
