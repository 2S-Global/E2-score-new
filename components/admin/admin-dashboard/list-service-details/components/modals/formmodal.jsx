import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CandidateformModal = ({
  show,
  onClose,
  data = {},
  setRefresh = () => { },
}) => {
  const [formData, setFormData] = useState({
    _id: data._id || "",
    title: data.title || "",
    description: data.description || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!show) return null;

  // ------------------------------
  // VALIDATION
  // ------------------------------
  const validateField = (name, value) => {
    switch (name) {
      case "description":
        return value ? "" : "Description is required.";

      case "title":
        return value ? "" : "Service Na is required.";

      default:
        return "";
    }
  };

  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  // ------------------------------
  // FORM SUBMIT
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    // -------------------------
    // Validate fields
    // -------------------------
    const validationErrors = {};
    ["title", "description"].forEach((key) => {
      validationErrors[key] = validateField(key, formData[key]);
    });

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setFormErrors(validationErrors);
      setTouched({
        title: true,
        description: true,
      });
      setLoading(false);
      return;
    }

    try {
      const isUpdate = Boolean(formData._id);

      const url = isUpdate
        ? `${apiurl}/api/home/update-service-details/${formData._id}`
        : `${apiurl}/api/home/add-service-details`;

      const payload = {
        ...formData,
        ...(isUpdate ? {} : { role: 2 }),
      };

      const method = isUpdate ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });

      // Backend does not return success: true
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || "Operation failed");
      }

      setSuccess(response.data.message);
      setRefresh(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Request failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {formData._id ? "Update Service" : "Add New Service"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <MessageComponent error={error} success={success} />

              <div className="row">
                {/* Name */}
                <div className="mb-3 col-md-12">
                  <label className="form-label">Service Name</label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control ${touched.title && formErrors.title ? "is-invalid" : ""
                      }`}
                    placeholder="Service Name"
                    value={formData.title || ""}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, title: true }))
                    }
                  />
                  {touched.title && formErrors.title && (
                    <div className="invalid-feedback">{formErrors.title}</div>
                  )}
                </div>

                {/* Email */}
                {/* <div className="mb-3 col-md-12">
                  <label className="form-label">Service Description</label>
                  <textarea
                    name="description"
                    type="text"
                    className={`form-control ${touched.description && formErrors.description ? "is-invalid" : ""
                      }`}
                    placeholder="Service Description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, description: true }))
                    }
                    rows={8}
                  />
                  {touched.description && formErrors.description && (
                    <div className="invalid-feedback">{formErrors.description}</div>
                  )}
                </div> */}

                <div className="mb-3 col-md-12">
                  <label className="form-label">
                    Description <span style={{ color: "red" }}>*</span>
                  </label>

                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={(content) => {
                      setFormData((prev) => ({ ...prev, description: content }));

                      // ✅ validate on change
                      setFormErrors((prev) => ({
                        ...prev,
                        description: validateField("description", content),
                      }));
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, description: true }))
                    }
                    
                    placeholder="Write detailed description here..."
                    className={`form-group ${touched.description && formErrors.description ? "is-invalid" : ""
                      }`}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }, { background: [] }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ align: [] }],
                        ["blockquote", "code-block"],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "color",
                      "background",
                      "script",
                      "list",
                      "indent",
                      "align",
                      "blockquote",
                      "code-block",
                      "link",
                      "image",
                      "video",
                    ]}
                  />

                  {/* ✅ Correct error display */}
                  {touched.description && formErrors.description && (
                    <div className="invalid-feedback d-block">
                      {formErrors.description}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || disableSubmit}
                style={{
                  pointerEvents: loading || disableSubmit ? "none" : "auto",
                  opacity: loading || disableSubmit ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <>{formData._id ? "Updating" : "Saving"}</>
                ) : (
                  <>{formData._id ? "Update" : "Save"}</>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
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

export default CandidateformModal;
