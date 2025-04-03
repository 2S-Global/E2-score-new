import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BranchModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">IT skills</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form className="default-form">
              <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>Country</label>
                  <select className="chosen-single form-select" required>
                    <option>Australia</option>
                    <option>Pakistan</option>
                    <option>Chaina</option>
                    <option>Japan</option>
                    <option>India</option>
                  </select>
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label>City</label>
                  <select className="chosen-single form-select" required>
                    <option>Melbourne</option>
                    <option>Pakistan</option>
                    <option>Chaina</option>
                    <option>Japan</option>
                    <option>India</option>
                  </select>
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                  <label>Complete Address</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-3 col-md-12">
                  <label>Latitude</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Melbourne"
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-3 col-md-12">
                  <label>Longitude</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Melbourne"
                    required
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                  <button className="theme-btn btn-style-three">
                    Search Location
                  </button>
                </div>

                {/* End MapBox */}

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                  <button type="submit" className="theme-btn btn-style-one">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
