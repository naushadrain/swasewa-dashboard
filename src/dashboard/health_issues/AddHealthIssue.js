import React, { useState, useCallback } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function AddHealthIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    doctorMapped: "",
    status: "active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Dropzone setup
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { title, description, doctorMapped } = form;

    // Validation
    if (!title || !description || !doctorMapped || !imageFile) {
      setError("All fields are required including the image.");
      return;
    }

    try {
      setSubmitting(true);

      // 1. Upload image to API
      const formData = new FormData();
      formData.append("imgUrl", imageFile);

      const res = await fetch("https://api.swasewa.com/api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!result?.status || !result.image_url) {
        throw new Error("Image upload failed.");
      }

      const iconPath = result.image_url;

      // 2. Save form + image URL to Firebase
      await addDoc(collection(db, "common_health_issues"), {
        ...form,
        iconPath,
        createdAt: serverTimestamp(),
      });

      alert("✅ Health issue added successfully!");
      navigate("/health/issues");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed. " + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="mb-4">Add Common Health Issue</h4>

          <div className="card p-4 shadow-sm">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Fever"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter short description"
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Mapped Doctor</label>
                <input
                  type="text"
                  name="doctorMapped"
                  className="form-control"
                  value={form.doctorMapped}
                  onChange={handleChange}
                  placeholder="e.g. General Physician"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Health Issue Icon</label>
                <div
                  {...getRootProps()}
                  className="border border-secondary p-3 rounded text-center"
                  style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here ...</p>
                  ) : (
                    <p>Drag & drop or click to upload icon</p>
                  )}
                  {imagePreview && (
                    <div className="mt-3 position-relative d-inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ height: 120, borderRadius: "8px" }}
                      />
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

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Add Issue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHealthIssue;
