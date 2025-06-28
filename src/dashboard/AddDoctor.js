import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

const AddDoctorPage = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    doctorName: "",
    hospitalName: "",
    medicalSpeciality: "",
    consultancyFee: "",
    licenses: "",
    about: "",
    specializationOverview: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty || !imageFile) {
      setAlertMsg({ type: "danger", text: "All fields and image are required!" });
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("imgUrl", imageFile); // Make sure the key matches the backend

      const res = await fetch("https://api.swasewa.com/api/imageUpload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (!data.status || !data.image_url) {
        throw new Error(data.message || "Image upload failed.");
      }

      const imagePath = data.image_url;

      await addDoc(collection(db, "doctors"), {
        ...formData,
        imagePath,
        avgRating: "0",
        noOfRating: "0",
        createdAt: serverTimestamp(),
      });

      setAlertMsg({ type: "success", text: "Doctor added successfully!" });
      setFormData({
        doctorName: "",
        hospitalName: "",
        medicalSpeciality: "",
        consultancyFee: "",
        licenses: "",
        about: "",
        specializationOverview: "",
      });
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      setAlertMsg({ type: "danger", text: "Error: " + err.message });
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="fw-bold mb-4">Add Doctor</h4>

          {alertMsg.text && (
            <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
              {alertMsg.text}
              <button type="button" className="btn-close" onClick={() => setAlertMsg({ text: "" })}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              {["doctorName", "hospitalName", "medicalSpeciality", "consultancyFee", "licenses"].map((field, i) => (
                <div className="col-md-6 mb-3" key={i}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={field}
                    className="form-control"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="col-md-6 mb-3">
                <label>About</label>
                <textarea
                  name="about"
                  className="form-control"
                  rows={3}
                  value={formData.about}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-md-6 mb-3">
                <label>Specialization Overview</label>
                <textarea
                  name="specializationOverview"
                  className="form-control"
                  rows={3}
                  value={formData.specializationOverview}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-md-6 mb-4">
                <label>Doctor Image</label>
                <div
                  {...getRootProps()}
                  className="border border-secondary p-3 rounded text-center"
                  style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the image here ...</p> : <p>Drag & drop or click to upload doctor image</p>}
                  {imagePreview && (
                    <div className="mt-3 position-relative">
                      <img src={imagePreview} alt="Preview" style={{ height: 120, borderRadius: "8px" }} />
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 translate-middle"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
              {loading ? "Submitting..." : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorPage;
