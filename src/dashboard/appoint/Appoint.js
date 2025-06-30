import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// ... (Your other imports for CSS and Components)
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/Dashboard.css";
import Sidebar from "../temp/Sidebar";
import TopNavbar from "../temp/TopNavbar";


function AppointsPage() {
    const location = useLocation();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            console.log("Starting to fetch appointments...");
            try {
                // 1. Fetch all documents from the 'appointments' collection
                const appointmentsQuery = query(collection(db, "appointments"));
                const appointmentsSnapshot = await getDocs(appointmentsQuery);
                const appointmentsList = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // --- DEBUG LOG ---
                console.log("Step 1: Raw appointments fetched:", appointmentsList);

                if (appointmentsList.length === 0) {
                    console.log("No appointments found. Finishing.");
                    setAppointments([]);
                    setLoading(false);
                    return;
                }

                // 2. Gather all unique user IDs and doctor IDs
                const userIds = [...new Set(appointmentsList.map(appt => appt.userId).filter(id => id))]; // .filter(id => id) removes any null/undefined IDs
                const doctorIds = [...new Set(appointmentsList.map(appt => appt.doctorId).filter(id => id))];

                // --- DEBUG LOG ---
                console.log("Step 2: Unique User IDs:", userIds);
                console.log("Step 2: Unique Doctor IDs:", doctorIds);

                let usersMap = {};
                let doctorsMap = {};

                // 3. Fetch users and doctors ONLY if there are IDs to fetch
                if (userIds.length > 0) {
                    const usersSnapshot = await getDocs(query(collection(db, "users"), where(documentId(), "in", userIds)));
                    usersSnapshot.forEach(doc => {
                        usersMap[doc.id] = doc.data().name; 
                    });
                     // --- DEBUG LOG ---
                    console.log("Step 3: Fetched users data map:", usersMap);
                }

                if (doctorIds.length > 0) {
                    const doctorsSnapshot = await getDocs(query(collection(db, "doctors"), where(documentId(), "in", doctorIds)));
                    doctorsSnapshot.forEach(doc => {
                        doctorsMap[doc.id] = doc.data().doctorName;
                    });
                     // --- DEBUG LOG ---
                    console.log("Step 3: Fetched doctors data map:", doctorsMap);
                }

                // 5. Combine all data into a final, enriched list
                const enrichedAppointments = appointmentsList.map(appt => ({
                    ...appt,
                    userName: usersMap[appt.uid] || "Unknown User",
                    doctorName: doctorsMap[appt.doctorId] || "Unknown Doctor",
                }));

                // --- DEBUG LOG ---
                console.log("Step 5: Final combined appointments list:", enrichedAppointments);
                setAppointments(enrichedAppointments);

            } catch (err) {
                // --- THIS IS WHERE THE ERROR IS CAUGHT ---
                console.error("ERROR FETCHING APPOINTMENTS:", err);
                setError("Failed to load appointments. Check the console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();

    }, []);

    // ... (Your getStatus function and JSX return statement remain the same)
    // Function to determine appointment status based on date
    const getStatus = (appointmentDate) => {
        const today = new Date();
        const apptDate = new Date(appointmentDate);
        today.setHours(0, 0, 0, 0); // Normalize today's date
        
        if (apptDate < today) {
            return <span className="badge bg-secondary">Completed</span>;
        } else {
            return <span className="badge bg-success">Upcoming</span>;
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
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Patient Name</th>
                                                <th scope="col">Doctor Name</th>
                                                <th scope="col">Fee</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.length > 0 ? (
                                                appointments.map(appt => (
                                                    <tr key={appt.id}>
                                                        <td>{appt.appointmentDate}</td>
                                                        <td>{appt.appointmentTime}</td>
                                                        <td>{appt.userName}</td>
                                                        <td>{appt.doctorName}</td>
                                                        <td>Rs. {appt.consultancyFee}</td>
                                                        <td>{getStatus(appt.appointmentDate)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center text-muted p-4">
                                                        No appointments found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointsPage;