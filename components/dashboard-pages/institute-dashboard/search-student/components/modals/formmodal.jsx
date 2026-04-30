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
            <h5 className="modal-title">Student Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-">
            {/* ================= Student Information ================= */}
            <h6 className="mb-3 border-bottom pb-2 text-primary">
              Student Information
            </h6>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <b>Name:</b> {toTitleCase(data.name)}
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
                <b>Admission Year:</b> {data.admissionYear || "-"}
              </div>

              <div className="col-md-6">
                <b>Program:</b>{" "}
                {data.programDetails?.name?.toUpperCase() || "-"}
              </div>
              <div className="col-md-6">
                <b>USN:</b> {data.USN ? data.USN.toUpperCase() : "-"}
              </div>
            </div>

            {/* ================= Educational Information ================= */}
            <h6 className="mb-3 border-bottom pb-2 text-success">
              Educational Information
            </h6>

            <div className="row g-2 mb-4">
              {/* 10th */}
              <div className="col-md-6">
                <div
                  className="card border-0 shadow-sm"
                  style={{ height: "78px" }}
                >
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-center mb-1 small">
                      <span className="text-muted">10th Marks</span>
                      <span className="fw-bold">{data.tenTh || "-"}%</span>
                    </div>

                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className={`progress-bar ${
                          data.tenTh >= 75
                            ? "bg-success"
                            : data.tenTh >= 50
                              ? "bg-warning"
                              : "bg-danger"
                        }`}
                        style={{ width: `${data.tenTh || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12th */}
              <div className="col-md-6">
                <div
                  className="card border-0 shadow-sm"
                  style={{ height: "78px" }}
                >
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-center mb-1 small">
                      <span className="text-muted">12th Marks</span>
                      <span className="fw-bold">{data.twelveTh || "-"}%</span>
                    </div>

                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className={`progress-bar ${
                          data.twelveTh >= 75
                            ? "bg-success"
                            : data.twelveTh >= 50
                              ? "bg-warning"
                              : "bg-danger"
                        }`}
                        style={{ width: `${data.twelveTh || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Semester Section ================= */}
            <h6 className="mt-3 fw-bold mb-2">
              {data.programDetails?.courseStructure === "year"
                ? "Year Marks"
                : "Semester Marks"}
            </h6>

            {data.semesters && data.semesters.length > 0 ? (
              <div className="row g-3">
                {[...(data.semesters || [])]
                  .sort((a, b) => a.semester - b.semester)
                  .map((sem, index) => {
                    const marks = Number(sem.convertedMarks ?? sem.marks) || 0;

                    let barColor = "bg-danger";
                    if (marks >= 75) barColor = "bg-success";
                    else if (marks >= 50) barColor = "bg-warning";

                    return (
                      <div className="col-md-4 col-sm-6" key={index}>
                        <div
                          className="card border-0 shadow-sm"
                          style={{ height: "78px" }}
                        >
                          <div className="card-body p-2">
                            <div className="d-flex justify-content-between mb-1 small">
                              <span>
                                {data.programDetails?.courseStructure === "year"
                                  ? `Year ${sem.semester}`
                                  : `Sem ${sem.semester}`}
                              </span>
                              <b>{marks}%</b>
                            </div>

                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className={`progress-bar ${barColor}`}
                                style={{ width: `${marks}%` }}
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
                No data available
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
