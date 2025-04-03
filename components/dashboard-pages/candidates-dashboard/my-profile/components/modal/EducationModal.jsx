/*  */

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EducationForm from "../academicbox_component/academicForm";

const EducationModal = ({ show, onClose }) => {
  const handleSave = () => {
    if (skills.length === 0) {
      setError("Please specify at least one Key Skill.");
    } else {
      console.log("Saved Skills:", skills);
      onClose();
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

            <EducationForm />
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
