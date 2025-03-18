import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <style>
        {`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }
`}
      </style>
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Online profiles From Github
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <p style={{ color: 'black' }}>
                Add link to online professional profiles (e.g. LinkedIn, etc.)</p>

              {/* Social profile */}
              <div className="mb-3">
                <label className="form-label"><b>Social profile</b></label>
                <input type="text" className="form-control" placeholder="Enter Social profile name" />
              </div>
              {/* URL */}
              <div className="mb-3">
                <label className="form-label"><b>URL</b></label>
                <input type="text" className="form-control" placeholder="Enter Your Social profile URL" />
              </div>
              {/* Description */}
              <div className="mb-3">
                <label className="form-label"><b>Description</b></label>
                <textarea className="form-control custom-textarea" placeholder="Type here ..." rows="3"></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );

};

export default ProfileModal;
