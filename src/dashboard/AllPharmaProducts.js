import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Dashboard.css";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

const AllPharmaProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth.currentUser) {
            setUserEmail(auth.currentUser.email);
        }
    }, []);

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

    const handleEdit = (id) => {
        navigate(`/pharma_product/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteDoc(doc(db, "pharma_products", id));
            setAlertMsg({ type: "success", text: "Product Deleted Successfully!" });
        }
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navbar */}
            <TopNavbar />

            {/* Dashboard Container */}
            <div className="dashboard-container d-flex">
                {/* Sidebar */}
                <Sidebar activePath={location.pathname} />

                {/* Main Content */}
                <div className="main-content p-4 w-100">
                    <h4 className="fw-bold mb-4">All Pharma Products</h4>

                    {alertMsg.text && (
                        <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
                            {alertMsg.text}
                            <button type="button" className="btn-close" onClick={() => setAlertMsg({ text: "" })}></button>
                        </div>
                    )}

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
                        {products.length === 0 && <p className="text-muted">No products available.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPharmaProductsPage;
