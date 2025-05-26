/*  */

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EducationForm from "../academicbox_component/academicForm2";

const EducationModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    level: "",
    state_id: "",
    board_id: "",
    year_of_passing: "",
    medium_of_education: "",
    marks: "",
  });

  const handleSave = () => {};

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
