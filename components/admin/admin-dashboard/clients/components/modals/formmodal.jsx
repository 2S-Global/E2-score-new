"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";

const formModal = ({ show, onClose, data = {}, setRefresh = () => {} }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    url: "",
    id: "",
  });

  const [selectedImage, setSelectedImage] = useState(
    data?.image ? data.image : null,
  );
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState({});

  // ✅ validation
  const validate = () => {
    let newErrors = {};
    if (!formData.url?.trim()) {
      newErrors.url = "URL is required";
    }
    return newErrors;
  };

  // ✅ handle image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFile(file);
    }
  };

  // ✅ edit mode
  useEffect(() => {
    if (data?._id) {
      setFormData({
        url: data?.url || "",
        id: data?._id || "",
      });
      setSelectedImage(data?.image || null);
    }
  }, [data?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErr((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErr(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const sendformData = new FormData();

      sendformData.append("url", formData.url);

      if (file) {
        sendformData.append("image", file);
      }

      const token = localStorage.getItem("Super_token");
      if (!token) {
        setError("Token not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        let response;

        if (data?._id) {
          sendformData.append("id", formData.id);

          response = await axios.post(
            `${apiurl}/api/clients/update-client`,
            sendformData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        } else {
          response = await axios.post(
            `${apiurl}/api/clients/add-client`,
            sendformData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        }

        setSuccess(response.data.message);
        setRefresh(() => true);
        onClose();
      } catch (err) {
        setError(
          err.response?.data?.message || "Something went wrong. Try again.",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal modal-lg fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">
              {data?._id ? "Edit Client" : "Add Client"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <MessageComponent error={error} success={success} />

              <div className="row">
                {/* URL FIELD */}
                <div className="mb-5 col-md-12">
                  <label className="form-label">
                    URL <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    value={formData.url}
                    onChange={handleChange}
                  />
                  {err?.url && <div style={{ color: "red" }}>{err.url}</div>}
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mb-5 col-md-12">
                  <div className="d-flex">
                    <span>
                      <label
                        htmlFor="file-upload"
                        className="btn btn-primary me-3"
                      >
                        Select Image
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </span>

                    <span>
                      <div
                        className="overflow-hidden border"
                        style={{
                          width: "120px",
                          height: "120px",
                          display: "grid",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                      >
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="preview"
                            className="w-100 h-100 object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Saving..." : data?._id ? "Update" : "Save"}
              </button>
            </form>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default formModal;
