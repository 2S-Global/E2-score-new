"use client";
import React from "react";

const CandidateformModal = ({ show, onClose, data = {} }) => {
  if (!show) return null;

  const toTitleCase = (str) => {
    if (!str) return "-";
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Candidate Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-">
            {/* ================= Candidate Information ================= */}
            <h6 className="mb-3 border-bottom pb-2 text-primary">
              Candidate Information
            </h6>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <b>Name:</b> {toTitleCase(data.name)}
              </div>

              <div className="col-md-6">
                <b>USN:</b> {data.USN || "-"}
              </div>

              <div className="col-md-6">
                <b>Program:</b> {toTitleCase(data.program)}
              </div>

              <div className="col-md-6">
                <b>Admission Year:</b> {data.admissionYear || "-"}
              </div>

              <div className="col-md-6">
                <b>Gender:</b> {toTitleCase(data.gender)}
              </div>

              <div className="col-md-6">
                <b>DOB:</b>{" "}
                {data.dob
                  ? new Date(data.dob).toLocaleDateString("en-GB")
                  : "-"}
              </div>

              <div className="col-md-6">
                <b>Status:</b>{" "}
                <span
                  className={`badge ${
                    data.status ? "bg-success" : "bg-danger"
                  }`}
                >
                  {data.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* ================= Educational Information ================= */}
            <h6 className="mb-3 border-bottom pb-2 text-success">
              Educational Information
            </h6>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <b>10th Marks:</b> {data.tenTh || "-"}(%)
              </div>

              <div className="col-md-6">
                <b>12th Marks :</b> {data.twelveTh || "-"}(%)
              </div>
            </div>

            {/* ================= Semester Section ================= */}
            <h6 className="mt-3 fw-bold mb-3">Semester Marks</h6>

            {data.semesters && data.semesters.length > 0 ? (
              <div className="row g-3">
                {data.semesters.map((sem, index) => {
                  const marks = Number(sem.marks) || 0;
                  const percentage = (marks / 10) * 100;

                  // color based on marks
                  let barColor = "bg-danger";
                  if (marks >= 7.5) barColor = "bg-success";
                  else if (marks >= 5.0) barColor = "bg-warning";

                  return (
                    <div className="col-md-4 col-sm-6" key={index}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          {/* Semester Title */}
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0 text-muted">
                              Semester {sem.semester}
                            </h6>
                            <span className="fw-bold">{marks}</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="progress" style={{ height: "10px" }}>
                            <div
                              className={`progress-bar ${barColor}`}
                              role="progressbar"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted py-3">
                No semester data available
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateformModal;
