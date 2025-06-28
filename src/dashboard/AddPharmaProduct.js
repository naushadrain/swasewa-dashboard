import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const AddPharmaProduct = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        currentPrice: "",
        originalPrice: "",
        imagePath: "",
    });

    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmpty = Object.values(formData).some((val) => val.trim() === "");
        if (isEmpty) {
            setAlertMsg({ type: "danger", text: "Please fill in all fields." });
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "pharma_products"), {
                ...formData,
                createdAt: serverTimestamp(),
            });

            setAlertMsg({ type: "success", text: "Product added successfully!" });
            setFormData({
                name: "",
                category: "",
                currentPrice: "",
                originalPrice: "",
                imagePath: "",
            });
        } catch (error) {
            setAlertMsg({ type: "danger", text: "Error: " + error.message });
        }
        setLoading(false);
    };

    return (
        <div className="dashboard-wrapper">
            <TopNavbar />
            <div className="dashboard-container d-flex">
                <Sidebar activePath={location.pathname} />

                <div className="main-content p-4 w-100">
                    <h4 className="fw-bold mb-4">Add Pharma Product</h4>

                    {alertMsg.text && (
                        <div className={`alert alert-${alertMsg.type}`} role="alert">
                            {alertMsg.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {[
                                { label: "Product Name", name: "name" },
                                { label: "Category", name: "category" },
                                { label: "Current Price", name: "currentPrice" },
                                { label: "Original Price", name: "originalPrice" },
                                { label: "Image URL", name: "imagePath" },
                            ].map((field, idx) => (
                                <div className="col-md-6 mb-3" key={idx}>
                                    <label>{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        className="form-control"
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Submitting..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPharmaProduct;
