import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom"; // add this import at the top

import "../styles/Dashboard.css";

const AllDoctoresPage = () => {
    const [doctors, setDoctors] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "doctors"), (snapshot) => {
            setDoctors(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <TopNavbar />

            <div className="dashboard-container d-flex">
                <Sidebar activePath={location.pathname} />

                <div className="main-content p-4 w-100">
                    <h4 className="fw-bold mb-4">All Doctors</h4>
                    <div className="row">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={doctor.imagePath}
                                        alt={doctor.doctorName}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{doctor.doctorName}</h5>
                                        <p className="card-text mb-1"><strong>Hospital:</strong> {doctor.hospitalName}</p>
                                        <p className="card-text mb-1"><strong>Speciality:</strong> {doctor.medicalSpeciality}</p>
                                        <p className="card-text mb-1"><strong>Fee:</strong> Rs. {doctor.consultancyFee}</p>
                                        <p className="card-text mb-1">
                                            <strong>Rating:</strong> ⭐ {doctor.avgRating} ({doctor.noOfRating} reviews)
                                        </p>
                                        <button
                                            className="btn btn-outline-primary btn-sm w-100 mt-2"
                                            onClick={() => navigate(`/doctor/${doctor.id}`)}
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {doctors.length === 0 && (
                            <p className="text-muted text-center mt-3">No doctors found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDoctoresPage;
