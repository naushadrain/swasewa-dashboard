import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";

import '../../styles/Dashboard.css';

const AllDoctoresPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, "doctors"), (snapshot) => {
            const doctorsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDoctors(doctorsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Placeholder image for doctors without any pictures
    const placeholderImage = "https://via.placeholder.com/400x300.png?text=No+Image";

    return (
        <div className="dashboard-wrapper">
            <TopNavbar />
            <div className="dashboard-container d-flex">
                <Sidebar activePath={location.pathname} />
                <div className="main-content p-4 w-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                         <h4 className="fw-bold">All Doctors</h4>
                         <button className="btn btn-primary" onClick={() => navigate('/add-doctor')}>
                            <i className="bi bi-plus-lg me-2"></i>Add New Doctor
                         </button>
                    </div>

                    <div className="row">
                        {loading ? (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <div key={doctor.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="card h-100 shadow-sm doctor-card">
                                        
                                        {/* --- Image Gallery Carousel --- */}
                                        {/* It checks for an imageGallery array. If not found, it uses the single imagePath. */}
                                        <div id={`carousel-${doctor.id}`} className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {doctor.imageGallery && doctor.imageGallery.length > 0 ? (
                                                    doctor.imageGallery.map((imgUrl, index) => (
                                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                            <img src={imgUrl} className="d-block w-100 card-img-top" alt={`Dr. ${doctor.doctorName}`} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="carousel-item active">
                                                         <img src={doctor.imagePath || placeholderImage} className="d-block w-100 card-img-top" alt={`Dr. ${doctor.doctorName}`} />
                                                    </div>
                                                )}
                                            </div>
                                            {doctor.imageGallery && doctor.imageGallery.length > 1 && (
                                                <div className="carousel-indicators">
                                                    {doctor.imageGallery.map((_, index) => (
                                                        <button key={index} type="button" data-bs-target={`#carousel-${doctor.id}`} data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : 'false'}></button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* --- Card Body --- */}
                                        {/* d-flex and flex-column allow us to push the button to the bottom */}
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title fw-bold">
                                                {doctor.doctorName}
                                                {/* Example of a "Verified" badge */}
                                                {doctor.isVerified && <i className="bi bi-patch-check-fill ms-2 text-primary" title="Verified"></i>}
                                            </h5>
                                            
                                            <p className="card-text text-muted mb-2">
                                                <i className="bi bi-hospital me-2"></i>
                                                {doctor.hospitalName || 'Independent Clinic'}
                                            </p>

                                            <div className="mb-3">
                                                <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">
                                                    <i className="bi bi-lungs me-1"></i> {/* Example Icon */}
                                                    {doctor.medicalSpeciality || 'General Physician'}
                                                </span>
                                            </div>

                                            <div className="d-flex justify-content-between text-muted small mb-3">
                                                <span>
                                                    <i className="bi bi-cash-coin me-1"></i>
                                                    <strong>Fee:</strong> Rs. {doctor.consultancyFee}
                                                </span>
                                                <span>
                                                    <i className="bi bi-briefcase me-1"></i>
                                                    <strong>Exp:</strong> {doctor.experience || 'N/A'} years
                                                </span>
                                            </div>

                                            <p className="card-text mb-3">
                                                <i className="bi bi-star-fill text-warning me-1"></i>
                                                <strong>{doctor.avgRating}</strong> 
                                                <span className="text-muted small"> ({doctor.noOfRating} reviews)</span>
                                            </p>
                                            
                                            {/* --- Button --- */}
                                            {/* mt-auto pushes this button to the bottom of the card, ensuring uniform alignment */}
                                            <button
                                                className="btn btn-primary w-100 mt-auto"
                                                onClick={() => navigate(`/doctor/${doctor.id}`)}
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p className="text-muted text-center mt-3">No doctors found. Click "Add New Doctor" to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDoctoresPage;