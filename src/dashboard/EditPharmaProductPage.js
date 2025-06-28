import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Dashboard.css";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

const EditPharmaProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        category: "",
        originalPrice: "",
        name: "",
        currentPrice: "",
        imagePath: "",
    });

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, "pharma_products", id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    setFormData(productSnap.data());
                } else {
                    setAlertMsg({ type: "danger", text: "Product not found!" });
                    setTimeout(() => navigate("/pharma_product"), 2000);
                }
            } catch (error) {
                setAlertMsg({ type: "danger", text: "Error fetching product." });
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);
        try {
            const productRef = doc(db, "pharma_products", id);
            await updateDoc(productRef, formData);
            setAlertMsg({ type: "success", text: "Product Updated Successfully!" });
            setTimeout(() => navigate("/pharma-products"), 1500);
        } catch (error) {
            setAlertMsg({ type: "danger", text: "Error updating product." });
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navbar */}
            <TopNavbar />

            {/* Layout */}
            <div className="dashboard-container d-flex">
                {/* Sidebar */}
                <Sidebar activePath={location.pathname} />


                {/* Main Content */}
                <div className="main-content p-4 w-100">
                    <h4 className="fw-bold mb-4">Edit Pharma Product</h4>

                    {alertMsg.text && (
                        <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
                            {alertMsg.text}
                            <button type="button" className="btn-close" onClick={() => setAlertMsg({ text: "" })}></button>
                        </div>
                    )}

                    <form noValidate className="pharma-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Category</label>
                                <input type="text" name="category" className={`form-control ${validated && !formData.category ? "is-invalid" : ""}`} value={formData.category} onChange={handleChange} required />
                                <div className="invalid-feedback">Category is required.</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Original Price</label>
                                <input type="text" name="originalPrice" className={`form-control ${validated && !formData.originalPrice ? "is-invalid" : ""}`} value={formData.originalPrice} onChange={handleChange} required />
                                <div className="invalid-feedback">Original price is required.</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Product Name</label>
                                <input type="text" name="name" className={`form-control ${validated && !formData.name ? "is-invalid" : ""}`} value={formData.name} onChange={handleChange} required />
                                <div className="invalid-feedback">Product name is required.</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Current Price</label>
                                <input type="text" name="currentPrice" className={`form-control ${validated && !formData.currentPrice ? "is-invalid" : ""}`} value={formData.currentPrice} onChange={handleChange} required />
                                <div className="invalid-feedback">Current price is required.</div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Product Image URL</label>
                                <input type="text" name="imagePath" className={`form-control ${validated && !formData.imagePath ? "is-invalid" : ""}`} value={formData.imagePath} onChange={handleChange} required />
                                <div className="invalid-feedback">Image URL is required.</div>
                            </div>
                        </div>

                        {/* Preview Image */}
                        {formData.imagePath && (
                            <div className="mb-3 text-center">
                                <img src={formData.imagePath} alt="Product Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                            </div>
                        )}

                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPharmaProductPage;
