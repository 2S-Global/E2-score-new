import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const AddFormModal = ({
  show,
  onClose,
  data = {},
  setRefresh = () => {},
}) => {
  const [formData, setFormData] = useState({
    _id: data._id || "",
    name: data.name || "",
    USN: data.USN || "",
    program: data.program || "",
    gender: data.gender || "",
    dob: data.dob || "",
    admissionYear: data.admissionYear || "",
    tenTh: data.tenTh || "",
    twelveTh: data.twelveTh || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
//validation error
  const [err, setErr] = useState(null);
  const [touched, setTouched] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [fields, setFields] = useState([{ value: "" }]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!show) return null;


 // validation 
const validate = () => {
      let newErrors = {};
      if (!formData.name?.trim()) {
        newErrors.name = "Name is required";
      } 
       if (!formData.USN?.trim()) {
        newErrors.USN = "USN is required";
      } 
       if (!formData.program?.trim()) {
        newErrors.program = "Program is required";
      } 
       if (!formData.gender?.trim()) {
        newErrors.gender = "Gender is required";
      } 
       if (!formData.dob?.trim()) {
        newErrors.dob = "DOB is required";
      } 
       if (!formData.admissionYear?.trim()) {
        newErrors.admissionYear = "Admission Year is required";
      } 
       if (!formData.tenTh?.trim()) {
        newErrors.tenTh = "10Th(%) is required";
      } 
       if (!formData.twelveTh?.trim()) {
        newErrors.twelveTh = "12Th(%) is required";
      } 
     
      return newErrors;
};


// Add new field
  const addField = () => {
    setFields([...fields, { value: "" }]);
  };

  // Remove field
  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Handle Semester change
  const handleSemesterChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };


  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

 

  // ------------------------------
  // FORM SUBMIT
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
 const validationErrors = validate();
        setErr(validationErrors);
   
    const token = localStorage.getItem("Institute_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    if (Object.keys(validationErrors).length === 0) {}

    try {
      const isUpdate = Boolean(formData._id);

      const url = isUpdate
        ? `${apiurl}/api/useradmin/update_user`
        : `${apiurl}/api/useradmin/add_user`;

      const payload = {
        ...formData,
        ...(isUpdate ? {} : { role: 1 }),
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
              {formData._id ? "Update Student" : "Add New Student"}
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
                <div className="mb-3 col-md-6">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                       err?.name ? "is-invalid" : ""
                    }`}
                    placeholder="Candidate Name"
                    value={formData?.name || ""}
                    onChange={handleChange}                   
                  />
                  { err?.name && (
                    <div className="invalid-feedback">{err.name}</div>
                  )}
                </div>
                   {/* DOB */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">DOB</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                       err?.dob ? "is-invalid" : ""
                    }`}
                    placeholder="DOB"
                    value={formData?.dob || ""}
                    onChange={handleChange}                   
                  />
                  { err?.dob && (
                    <div className="invalid-feedback">{err.dob}</div>
                  )}
                </div>

                {/* gender */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Gender</label>
                   <select class="form-select"  name="gender"  onChange={handleChange}  value={formData.gender || ""}>
                    <option value="">Please select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  {err?.gender && (
                    <div className="invalid-feedback">{err.gender}</div>
                  )}
                </div>

                {/* admission Year */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Admission Year</label>
                 
                   <select class="form-select"  name="admissionYear"  onChange={handleChange}  value={formData.admissionYear || ""}>
                    <option value="">Please select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  {err?.admissionYear && (
                    <div className="invalid-feedback">{err.admissionYear}</div>
                  )}
                </div>
               

                {/* USN */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">USN</label>
                  <input
                    type="text"
                    name="USN"
                    className={`form-control ${
                       err?.USN ? "is-invalid" : ""
                    }`}
                    placeholder="USN"
                    value={formData?.USN || ""}
                    onChange={handleChange}
                  />
                  { err?.USN && (
                    <div className="invalid-feedback">{err?.USN}</div>
                  )}
                </div>
                 {/* Program */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Program</label>
                  <input
                    type="text"
                    name="program"
                    className={`form-control ${
                       err?.program ? "is-invalid" : ""
                    }`}
                    placeholder="Program"
                    value={formData.program || ""}
                    onChange={handleChange}
                    onBlur={() =>
                      a
                    }
                  />
                  { err?.program && (
                    <div className="invalid-feedback">{err?.program}</div>
                  )}
                </div>
                 {/* 10th(%) */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">10Th(%)</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                       err?.tenTh ? "is-invalid" : ""
                    }`}
                    placeholder="10Th(%)"
                    value={formData.tenTh || ""}
                    onChange={handleChange}
                    onBlur={() =>
                     a
                    }
                  />
                  { err?.tenTh && (
                    <div className="invalid-feedback">{err.tenTh}</div>
                  )}
                </div>
                 {/* 12Th(%) */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">12Th(%)</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                       err?.twelveTh ? "is-invalid" : ""
                    }`}
                    placeholder="12Th(%)"
                    value={formData.twelveTh || ""}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, name: true }))
                    }
                  />
                  { err?.twelveTh && (
                    <div className="invalid-feedback">{err.twelveTh}</div>
                  )}
                </div>
                
                <h6 className="mb-3 border-bottom col-md-6">Semester Marks</h6>
                  <span
                  className="mb-3 border-bottom col-md-6"
                        onClick={addField}
                        style={{
                          cursor: "pointer",
                          color: "#5c1ecf",    
                          textAlign:"right"                     
                        }}
                      >
                       Add Semester
                      </span>
                              <div className="container">
                                      {fields.map((field, index) => (
                                        <div className="input-group mb-3" key={index}>
                                         <span className="pe-2">Semester {index+1} </span> 
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter value"
                                            value={field.value}
                                            onChange={(e) => handleSemesterChange(index, e)}
                                          />

                                          <span
                                            className="btn btn-danger"
                                            onClick={() => removeField(index)}
                                          >
                                            Delete
                                          </span>
                                        </div>
                                      ))}

                                      
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
                  <>{formData._id ? "Updating" : "Submiting"}</>
                ) : (
                  <>{formData._id ? "Update" : "Submit"}</>
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

export default AddFormModal;
