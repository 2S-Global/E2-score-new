"use client";

import React from "react";

const Careerblock = ({ data = {} }) => {
  // Define display names for your known fields
  const fieldLabels = {
    industry_name: "Current Industry",
    department_name: "Department",
    job_role_name: "Job Role",
    job_type: "Desired Job Type",
    employment_type: "Desired Employment Type",
    shift: "Preferred Shift",
    preferredLocations: "Preferred Work Location",
  };

  // Filter only fields that exist in your data or known structure
  // const fieldsToDisplay = Object.keys(fieldLabels).filter((key) => key in data);

  // show all fields for now
  const fieldsToDisplay = Object.entries(fieldLabels);

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Career Profile</h4>
        </div>

        <div className="widget-content">
          <div className="row">
            {/*  {fieldsToDisplay.length > 0 ? ( */}
            {fieldsToDisplay.map(([key, label], index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-2">
                <div className="info-list d-flex justify-content-between align-items-center border-bottom pb-1">
                  <span className="title fw-semibold">{label}:</span>
                  <span
                    className={`value ${
                      !data[key] || data[key] === "" ? "text-muted" : ""
                    }`}
                  >
                    {data[key] && data[key] !== "" ? data[key] : "N/A"}
                  </span>
                </div>
              </div>
            ))}
            {/* ) : (
            <div className="col-12 text-center text-muted">
              No personal information available.
            </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careerblock;
