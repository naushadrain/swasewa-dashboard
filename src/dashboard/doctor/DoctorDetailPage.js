import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";
import { useLocation } from "react-router-dom";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDoctor = async () => {
      const docRef = doc(db, "doctors", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDoctor(docSnap.data());
      } else {
        alert("Doctor not found");
        navigate("/doctors");
      }
    };
    fetchDoctor();
  }, [id, navigate]);

  if (!doctor) return <div className="p-4">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="fw-bold mb-4">Doctor Details</h4>
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={doctor.imagePath}
                  className="img-fluid rounded-start"
                  alt={doctor.doctorName}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{doctor.doctorName}</h5>
                  <p className="card-text"><strong>Hospital:</strong> {doctor.hospitalName}</p>
                  <p className="card-text"><strong>Speciality:</strong> {doctor.medicalSpeciality}</p>
                  <p className="card-text"><strong>Consultancy Fee:</strong> Rs. {doctor.consultancyFee}</p>
                  <p className="card-text"><strong>Average Rating:</strong> ⭐ {doctor.avgRating}</p>
                  <p className="card-text"><strong>Number of Ratings:</strong> {doctor.noOfRating}</p>
                  <p className="card-text"><strong>Licenses:</strong> {doctor.licenses}</p>
                  <p className="card-text"><strong>About:</strong> {doctor.about}</p>
                  <p className="card-text"><strong>Specialization Overview:</strong> {doctor.specializationOverview}</p>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
