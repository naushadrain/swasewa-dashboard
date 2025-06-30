import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";
import { useLocation } from "react-router-dom";
import "../../styles/Dashboard.css";

const AllHospitalsPage = () => {
  const location = useLocation();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "hospitals"), (snapshot) => {
      setHospitals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="fw-bold mb-4">All Hospitals</h4>

          {hospitals.length === 0 ? (
            <p className="text-muted">No hospital records found.</p>
          ) : (
            hospitals.map((hospital) => (
              <div key={hospital.id} className="card shadow-lg mb-4">
                {/* Banner */}
                <div className="position-relative">
                  <img
                    src={hospital.imagePath}
                    alt={hospital.name}
                    className="w-100"
                    style={{ height: 300, objectFit: "cover" }}
                  />
                  <div className="position-absolute bottom-0 start-0 bg-dark text-white px-3 py-2 rounded-top">
                    ⭐ {hospital.avgRating} ({hospital.noOfRating} reviews)
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="fw-bold mb-1">{hospital.name}</h3>
                  <p className="text-muted">{hospital.place}, {hospital.province}</p>

                  <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${hospital.email}`}>{hospital.email}</a></p>
                  <p className="mb-3"><strong>Contact:</strong> <a href={`tel:${hospital.contactNumber}`}>{hospital.contactNumber}</a></p>

                  <div className="mb-3">
                    <strong>Description:</strong>
                    <p className="text-justify" style={{ maxHeight: 180, overflowY: "auto" }}>
                      {hospital.description}
                    </p>
                  </div>

                  {hospital.serviceList?.length > 0 && (
                    <div className="mb-3">
                      <strong>Services:</strong>
                      <ul className="list-unstyled row row-cols-2 row-cols-md-3 g-2 mt-2">
                        {hospital.serviceList.map((service, idx) => (
                          <li key={idx} className="col">
                            <i className="fa fa-check text-success me-2"></i> {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hospital.tags?.length > 0 && (
                    <div className="mb-3">
                      <strong>Tags:</strong>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {hospital.tags.map((tag, idx) => (
                          <span key={idx} className="badge bg-secondary">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hospital.galleryImages?.length > 0 && (
                    <div className="mb-2">
                      <strong>Gallery:</strong>
                      <div className="row row-cols-2 row-cols-md-3 g-2 mt-1">
                        {hospital.galleryImages.map((img, idx) => (
                          <div className="col" key={idx}>
                            <img
                              src={img}
                              alt={`Gallery ${idx}`}
                              className="img-fluid rounded"
                              style={{ height: 120, objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHospitalsPage;
