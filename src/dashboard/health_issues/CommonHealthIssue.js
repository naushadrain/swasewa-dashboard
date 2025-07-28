import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";

function CommonHealthIssues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "common_health_issues"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setIssues(data);
            } catch (error) {
                console.error("Error fetching health issues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this issue?")) {
            try {
                await deleteDoc(doc(db, "common_health_issues", id));
                setIssues(prev => prev.filter(issue => issue.id !== id));
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        try {
            const issueRef = doc(db, "common_health_issues", id);
            await updateDoc(issueRef, { status: newStatus });
            setIssues(prev =>
                prev.map(issue =>
                    issue.id === id ? { ...issue, status: newStatus } : issue
                )
            );
        } catch (err) {
            console.error("Status update failed:", err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-health-issue/${id}`);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <TopNavbar />
            <div className="dashboard-container d-flex">
                <Sidebar activePath={location.pathname} />
                <div className="main-content p-4 w-100">
                    <h3 className="text-center mb-4">Common Health Issues</h3>
                    <div className="row">
                        {issues.map(issue => (
                            <div className="col-md-4 col-sm-6 mb-4" key={issue.id}>
                                <div className="card h-100 shadow-sm border-0 position-relative">

                                    {/* Buttons: top-right corner */}
                                    <div className="position-absolute top-0 end-0 p-2 d-flex gap-2 z-1">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(issue.id)}
                                            title="Edit"
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(issue.id)}
                                            title="Delete"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                        <button
                                            className={`btn btn-sm ${issue.status === "active" ? "btn-success" : "btn-warning"}`}
                                            onClick={() => handleToggleStatus(issue.id, issue.status || "active")}
                                            title={issue.status === "active" ? "Deactivate" : "Activate"}
                                        >
                                            <i className="fa fa-toggle-on"></i>
                                        </button>
                                    </div>

                                    {/* Card Content */}
                                    <div className="card-body text-center">
                                        <img
                                            src={issue.iconPath}
                                            alt={issue.title}
                                            style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                            className="mb-3"
                                        />
                                        <h5 className="card-title">{issue.title}</h5>
                                        <p className="card-text text-muted">{issue.description}</p>
                                        <span className="badge bg-info text-dark mb-1 d-block">
                                            Consult: {issue.doctorMapped}
                                        </span>
                                        {/* <span
                                            className={`badge ${issue.status === "inactive" ? "bg-secondary" : "bg-success"}`}
                                        >
                                            {issue.status === "inactive" ? "Inactive" : "Active"}
                                        </span> */}
                                    </div>
                                </div>
                            </div>

                        ))}
                        {issues.length === 0 && (
                            <div className="text-center text-muted">No health issues found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommonHealthIssues;
