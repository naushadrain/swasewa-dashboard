import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Sidebar from "../temp/Sidebar";
import TopNavbar from "../temp/TopNavbar";
import { useLocation } from "react-router-dom";

const allTags = [
  "Cardiology", "Critical Care Medicine", "Dermatology", "Gastroenterology",
  "General surgery", "Emergency medicine", "Endocrinology", "Internal medicine",
  "Nephrology", "Neurology", "Oncology", "Pediatrics", "Radiology",
  "Anaesthesia", "Orthopedics", "Plastic surgery", "Psychiatry", "Urology", "Emergency"
];

const allServices = [
  "24 hours service", "Ambulance Facility", "Enough ICU wards", "Free SOS service"
];

const AddHospitalPage = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    province: "",
    contactNumber: "",
    email: "",
    description: "",
    imagePath: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (type === "tag") {
      setSelectedTags((prev) =>
        isChecked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else if (type === "service") {
      setSelectedServices((prev) =>
        isChecked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
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
      await addDoc(collection(db, "hospitals"), {
        ...formData,
        tags: selectedTags,
        serviceList: selectedServices,
        avgRating: "0",
        noOfRating: "0",
        createdAt: serverTimestamp(),
      });

      setAlertMsg({ type: "success", text: "Hospital added successfully!" });
      setFormData({
        name: "",
        place: "",
        province: "",
        contactNumber: "",
        email: "",
        description: "",
        imagePath: "",
      });
      setSelectedTags([]);
      setSelectedServices([]);
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
          <h4 className="fw-bold mb-4">Add Hospital</h4>

          {alertMsg.text && (
            <div className={`alert alert-${alertMsg.type}`} role="alert">
              {alertMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                { label: "Name", name: "name" },
                { label: "Place", name: "place" },
                { label: "Province", name: "province" },
                { label: "Contact Number", name: "contactNumber" },
                { label: "Email", name: "email" },
                { label: "Image URL", name: "imagePath" },
              ].map((field, idx) => (
                <div className="col-md-6 mb-3" key={idx}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Description */}
              <div className="col-12 mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Tags Checkboxes */}
              <div className="col-12 mb-4">
                <label className="fw-semibold mb-2">Tags (Medical Specialities)</label>
                <div className="row">
                  {allTags.map((tag, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={(e) => handleCheckboxChange(e, "tag")}
                          id={`tag-${idx}`}
                        />
                        <label className="form-check-label" htmlFor={`tag-${idx}`}>
                          {tag}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Checkboxes */}
              <div className="col-12 mb-4">
                <label className="fw-semibold mb-2">Available Services</label>
                <div className="row">
                  {allServices.map((service, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={(e) => handleCheckboxChange(e, "service")}
                          id={`service-${idx}`}
                        />
                        <label className="form-check-label" htmlFor={`service-${idx}`}>
                          {service}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Add Hospital"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHospitalPage;
