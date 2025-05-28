/*  */

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EducationForm from "../academicbox_component/academicForm3";
import axios from "axios";

const EducationModal = ({ show, onClose }) => {
  const token = localStorage.getItem("candidate_token");
  if (!token) {
    console.log("No token");
  }
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    level: "",
    state: "",
    board: "",
    year_of_passing: "",
    medium: "",
    marks: "",
    eng_marks: "",
    math_marks: "",
    university: "",
    institute_name: "",
    course_name: "",
    course_type: "",
    start_year: "",
    end_year: "",
    grading_system: "",
    is_primary: false,
    transcript: null,
    certificate: null,
  });

  const handleSave = async () => {
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      const payload = new FormData();

      // Append all fields manually or dynamically
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        `${apiurl}/api/useraction/usereducation`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Education data saved successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving education data:", error);
    }
  };

  if (!show) return null;

  return (
    /*  */
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Education</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p style={{ color: "black" }}>
              Details like course, university, and more, help recruiters
              identify your educational background
            </p>

            {/* <button
              className="btn btn-primary"
              onClick={() => console.log(formData)}
            >
              TEST
            </button> */}

            <EducationForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Footer Buttons */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
