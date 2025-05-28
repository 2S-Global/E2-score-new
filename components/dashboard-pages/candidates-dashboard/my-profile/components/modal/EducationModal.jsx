/*  */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EducationForm from "../academicbox_component/academicForm3";
import axios from "axios";

const EducationModal = ({ show, onClose }) => {
  const token = localStorage.getItem("candidate_token");
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
    transcriptPreview: "",
    certificate: null,
    certificatePreview: "",
    level_type: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    // 'level' is always required
    if (!formData.level || formData.level.toString().trim() === "") {
      return false;
    }

    if (formData.level == 1 || formData.level == 2) {
      const requiredFields = [
        "level",
        "state",
        "board",
        "year_of_passing",
        "medium",
        "marks",
        "transcript",
        "certificate",
      ];

      if (formData.level == 2) {
        requiredFields.push("eng_marks");
        requiredFields.push("math_marks");
      }

      const isAnyFieldEmpty = requiredFields.some((field) => {
        const value = formData[field];
        if (field === "transcript" || field === "certificate") {
          return !value;
        }
        return !value || value.toString().trim() === "";
      });

      if (isAnyFieldEmpty) return false;
    } else {
      const requiredFields = [
        "level",
        "state",
        "university",
        "institute_name",
        "course_name",
        "course_type",
        "start_year",
        "end_year",
        "grading_system",
        "marks",
        "transcript",
        "certificate",
      ];
      const isAnyFieldEmpty = requiredFields.some((field) => {
        const value = formData[field];
        if (field === "transcript" || field === "certificate") {
          return !value;
        }
        return !value || value.toString().trim() === "";
      });

      if (isAnyFieldEmpty) return false;
      0;
    }

    return true;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleSave = async () => {
    if (!token) {
      console.error("Authorization token is missing. Please log in.");
      return;
    }

    if (!validateForm()) {
      console.log("Please fill in all required fields.");
      return;
    }

    try {
      const payload = new FormData();
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
            {/* 
            <button
              className="btn btn-primary"
              onClick={() => console.log(formData)}
            >
              TEST
            </button> */}

            <EducationForm formData={formData} setFormData={setFormData} />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <style jsx>{`
              .tooltip-wrapper {
                position: relative;
                display: inline-block;
              }

              .tooltip-wrapper .custom-tooltip {
                visibility: hidden;
                background-color: white;
                color: red;
                font-weight: bold;
                text-align: center;
                border: 1px solid red;
                border-radius: 4px;
                padding: 5px 10px;
                position: absolute;
                bottom: 100%;
                left: 0;
                margin-bottom: 6px;
                z-index: 1;
                white-space: nowrap;
              }

              .tooltip-wrapper:hover .custom-tooltip {
                visibility: visible;
              }
            `}</style>

            <div className="tooltip-wrapper">
              {!isFormValid && (
                <div className="custom-tooltip">
                  Please fill all required fields
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
