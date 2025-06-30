import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Dashboard.css";
import Sidebar from "./temp/Sidebar";
import TopNavbar from "./temp/TopNavbar";

const UserPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = useState([]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const fetchedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(fetchedUsers);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteDoc(doc(db, "users", id));
        }
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navbar */}
            <TopNavbar />

            {/* Sidebar & Content */}
            <div className="dashboard-container d-flex">
                {/* Sidebar */}
                <Sidebar activePath={location.pathname} />

                {/* Main Content */}
                <div className="main-content p-4 w-100">
                    <h4 className="mb-4 fw-bold">All Users</h4>

                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Blood Group</th>
                                    <th>User Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.gender}</td>
                                        <td>{new Date(user.dob).toLocaleDateString()}</td>
                                        <td>{user.bloodGroup}</td>
                                        <td>{user.userType}</td>
                                        <td>
                                            <div className="d-flex flex-column gap-1">
                                                <button className="btn btn-success btn-sm">Activate</button>
                                                <button className="btn btn-warning btn-sm">Deactivate</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && <p className="text-muted mt-3">No users found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
