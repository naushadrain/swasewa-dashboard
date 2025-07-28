import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useDropzone } from "react-dropzone";
import TopNavbar from "../temp/TopNavbar";
import Sidebar from "../temp/Sidebar";

function EditHealthIssue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    doctorMapped: "",
    status: "active",
    iconPath: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const docRef = doc(db, "common_health_issues", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm(data);
          setImagePreview(data.iconPath);
        } else {
          setError("Health issue not found.");
        }
      } catch (err) {
        setError("Failed to load issue.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, iconPath: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.doctorMapped) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);

      let iconPath = form.iconPath;

      if (imageFile) {
        const formData = new FormData();
        formData.append("imgUrl", imageFile); // ✅ Correct key as per API

        const res = await fetch("https://api.swasewa.com/api/imageUpload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (!result?.status || !result.image_url) {
          throw new Error("Image upload failed.");
        }

        iconPath = result.image_url;
      }

      await updateDoc(doc(db, "common_health_issues", id), {
        ...form,
        iconPath,
        updatedAt: serverTimestamp()
      });

      alert("✅ Health issue updated successfully!");
      navigate("/health/issues");
    } catch (err) {
      console.error("Update error:", err);
      setError("Update failed. " + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      <TopNavbar />
      <div className="dashboard-container d-flex">
        <Sidebar activePath={location.pathname} />
        <div className="main-content p-4 w-100">
          <h4 className="mb-4">Edit Health Issue</h4>
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows={3}
                value={form.description}
                onChange={handleChange}
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
                  <p>Drag & drop or click to change icon</p>
                )}
                {imagePreview && (
                  <div className="mt-3 position-relative d-inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ height: 100, borderRadius: "8px" }}
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

            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Issue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditHealthIssue;
