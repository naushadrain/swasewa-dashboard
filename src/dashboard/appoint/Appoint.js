import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  limit,
  startAfter,
  orderBy
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/Dashboard.css";
import Sidebar from "../temp/Sidebar";
import TopNavbar from "../temp/TopNavbar";

function AppointsPage() {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [paginatedAppointments, setPaginatedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        const appointmentsList = appointmentsSnapshot.docs.map(doc => ({
          appointmentId: doc.id,
          ...doc.data(),
        }));

        const userIds = [...new Set(appointmentsList.map(appt => appt.userId).filter(id => id))];
        const doctorIds = [...new Set(appointmentsList.map(appt => appt.doctorId).filter(id => id))];

        let usersMap = {};
        let doctorsMap = {};

        if (userIds.length > 0) {
          const usersSnapshot = await getDocs(
            query(collection(db, "users"), where(documentId(), "in", userIds))
          );
          usersSnapshot.forEach(doc => {
            usersMap[doc.id] = doc.data().firstName;
          });
        }

        if (doctorIds.length > 0) {
          const doctorsSnapshot = await getDocs(
            query(collection(db, "doctors"), where(documentId(), "in", doctorIds))
          );
          doctorsSnapshot.forEach(doc => {
            doctorsMap[doc.id] = doc.data().doctorName;
          });
        }

        const enrichedAppointments = appointmentsList.map(appt => ({
          ...appt,
          userName: usersMap[appt.userId] || "Unknown User",
          doctorName: doctorsMap[appt.doctorId] || "Unknown Doctor",
        }));

        setAppointments(enrichedAppointments);
        setCurrentPage(1); // reset to page 1
      } catch (err) {
        console.error("ERROR FETCHING APPOINTMENTS:", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedAppointments(appointments.slice(indexOfFirstItem, indexOfLastItem));
  }, [appointments, currentPage]);

  const getStatus = (appointmentDate) => {
    const today = new Date();
    const apptDate = new Date(appointmentDate);
    today.setHours(0, 0, 0, 0);
    if (apptDate < today) {
      return <span className="badge bg-secondary">Completed</span>;
    } else {
      return <span className="badge bg-success">Upcoming</span>;
    }
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="fw-bold mb-4">All Appointments</h4>

          <div className="card shadow-sm">
            <div className="card-body">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Type</th>
                          <th>Patient Name</th>
                          <th>Doctor Name</th>
                          <th>Fee</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAppointments.length > 0 ? (
                          paginatedAppointments.map(appt => (
                            <tr key={appt.appointmentId}>
                              <td>{appt.appointmentDate}</td>
                              <td>{appt.appointmentTime}</td>
                              <td>{appt.appointmentType}</td>
                              <td>{appt.userName}</td>
                              <td>{appt.doctorName}</td>
                              <td>Rs. {appt.consultancyFee}</td>
                              <td>{getStatus(appt.appointmentDate)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-muted p-4">
                              No appointments found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className="btn btn-outline-primary"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                      <span>Page {currentPage} of {totalPages}</span>
                      <button
                        className="btn btn-outline-primary"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointsPage;
