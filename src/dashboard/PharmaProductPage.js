import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Dashboard.css";

const PharmaProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        category: "",
        originalPrice: "",
        name: "",
        currentPrice: "",
        imagePath: "",
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "pharma_products"), (snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);

        const isEmptyField = Object.values(formData).some((val) => val.trim() === "");
        if (isEmptyField) {
            setAlertMsg({ type: "danger", text: "Please fill in all fields before submitting." });
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "pharma_products"), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setAlertMsg({ type: "success", text: "Pharma Product Added Successfully!" });
            setFormData({
                category: "",
                originalPrice: "",
                name: "",
                currentPrice: "",
                imagePath: "",
            });
            setValidated(false);
        } catch (error) {
            setAlertMsg({ type: "danger", text: "Error adding product: " + error.message });
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteDoc(doc(db, "pharma_products", id));
            setAlertMsg({ type: "success", text: "Product Deleted Successfully!" });
        }
    };

    const handleEdit = (id) => {
        navigate(`/pharma_product/edit/${id}`);
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navbar */}
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
                                <i className="fa fa-user-circle me-1"></i> {auth.currentUser?.email || "Admin"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="dashboard-container d-flex">
                {/* Sidebar */}
                <div className="sidebar bg-light shadow-sm">
                    <ul className="sidebar-menu list-unstyled mt-3">
                        <li className={location.pathname === "/dashboard" ? "active" : ""}>
                            <Link to="/dashboard"><i className="fa fa-home me-2"></i> Dashboard</Link>
                        </li>

                        {/* Doctor Dropdown */}
                        <li>
                            <a
                                data-bs-toggle="collapse"
                                href="#doctorMenu"
                                role="button"
                                aria-expanded="false"
                                aria-controls="doctorMenu"
                                className="d-flex align-items-center justify-content-between"
                            >
                                <span><i className="fa fa-user-md me-2"></i> Doctor</span>
                                <i className="fa fa-chevron-down"></i>
                            </a>
                            <ul className="collapse list-unstyled ps-3 mt-2" id="doctorMenu">
                                <li className={location.pathname === "/doctors" ? "active" : ""}>
                                    <Link to="/doctors">All Doctors</Link>
                                </li>
                                <li className={location.pathname === "/add-doctor" ? "active" : ""}>
                                    <Link to="/add-doctor">Add Doctor</Link>
                                </li>
                            </ul>
                        </li>

                        <li className={location.pathname === "/pharma_product" ? "active" : ""}>
                            <Link to="/pharma_product"><i className="fa fa-medkit me-2"></i> Pharma Product</Link>
                        </li>
                        <li className={location.pathname === "/users" ? "active" : ""}>
                            <Link to="/users"><i className="fa fa-users me-2"></i> Users</Link>
                        </li>
                        <li className={location.pathname === "/settings" ? "active" : ""}>
                            <Link to="/settings"><i className="fa fa-cog me-2"></i> Settings</Link>
                        </li>
                    </ul>

                </div>

                {/* Main Content */}
                <div className="main-content p-4 w-100">
                    <h4 className="fw-bold mb-4">Add Pharma Product</h4>

                    {alertMsg.text && (
                        <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
                            {alertMsg.text}
                            <button type="button" className="btn-close" onClick={() => setAlertMsg({ text: "" })}></button>
                        </div>
                    )}

                    {/* Form */}
                    <form noValidate onSubmit={handleSubmit} className="pharma-form mb-5">
                        <div className="row">
                            {[
                                { name: "category", label: "Category" },
                                { name: "originalPrice", label: "Original Price" },
                                { name: "name", label: "Product Name" },
                                { name: "currentPrice", label: "Current Price" },
                                { name: "imagePath", label: "Product Image URL" },
                            ].map((field, i) => (
                                <div className={`col-md-${field.name === "imagePath" ? "12" : "6"} mb-3`} key={i}>
                                    <label>{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        className={`form-control ${validated && !formData[field.name] ? "is-invalid" : ""}`}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">{field.label} is required.</div>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </form>

                    {/* Product Grid */}
                    <h5 className="mb-3">Pharma Products</h5>
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-md-3 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img src={product.imagePath} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} alt={product.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text"><strong>Category:</strong> {product.category}</p>
                                        <p className="card-text"><strong>Price:</strong> ${product.currentPrice} <del>${product.originalPrice}</del></p>
                                        <button className="btn btn-warning btn-sm w-100 mb-1" onClick={() => handleEdit(product.id)}>Edit</button>
                                        <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(product.id)}>Delete</button>
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

export default PharmaProductPage;
