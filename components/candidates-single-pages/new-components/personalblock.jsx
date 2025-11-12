"use client";

import React from "react";
import { useEffect, useState } from "react";
const Personalblock = ({ dataog = {} }) => {
  const [data, setData] = useState(dataog);

  const getCareerBreakLine = (data) => {
    const {
      career_break,
      currently_on_career_break,
      career_break_start_month,
      career_break_start_year,
      career_break_end_month,
      career_break_end_year,
      career_break_reason,
    } = data;

    // If no career break
    if (career_break === "No") return "No";

    // Build the line step-by-step
    let line = career_break_reason ? `${career_break_reason}` : "";

    if (career_break_start_month && career_break_start_year) {
      line += `${line ? " | " : ""}${career_break_start_month} ${career_break_start_year}`;
    }

    if (currently_on_career_break) {
      line += " - Present";
    } else if (career_break_end_month && career_break_end_year) {
      line += ` - ${career_break_end_month} ${career_break_end_year}`;
    }

    return line.trim();
  };

  const getdaline = (data) => {
    const { differently_abled, disability_type, disability_description } = data;

    // If not differently abled
    if (differently_abled === "No") return "No";

    // Build the descriptive line
    let line = "";

    if (disability_type) {
      line += disability_type;
    }

    if (disability_description) {
      // Add a separator only if both fields exist
      line += `${line ? " | " : ""}${disability_description}`;
    }

    return line.trim() || "Yes"; // Fallback: if only differently_abled === 'Yes' but no details
  };

  useEffect(() => {
    const newLine = getCareerBreakLine(data);
    const newdaline = getdaline(data);
    if (newLine !== data.carrerbreakline) {
      setData((prev) => ({
        ...prev,
        carrerbreakline: newLine,
      }));
    }
    if (newdaline !== data.differentlyAbledline) {
      setData((prev) => ({
        ...prev,
        differentlyAbledline: newdaline,
      }));
    }
  }, [data]);

  // Define display names for your known fields
  const fieldLabels = {
    marital_status: "Marital Status",
    category: "Category",
    permanent_address: "Permanent address",
    pincode: "Pincode",
    differentlyAbledline: "Differently Abled",
    carrerbreakline: "Career Break",
    usaworkpermitline: "USA Work Permit",
    work_permit_other_countries: "Other County Work Permit",
    more_info: "More Information",
  };

  // Filter only fields that exist in your data or known structure
  // const fieldsToDisplay = Object.keys(fieldLabels).filter((key) => key in data);

  // show all fields for now
  const fieldsToDisplay = Object.entries(fieldLabels);

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Personal Information</h4>
        </div>

        <div className="widget-content">
          <div className="row">
            {/*  {fieldsToDisplay.length > 0 ? ( */}
            {fieldsToDisplay.map(([key, label], index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-2">
                <div className="info-list d-flex justify-content-between align-items-center border-bottom pb-1">
                  <span
                    className="title fw-semibold me-1"
                    style={{ whiteSpace: "nowrap" }}
                    title={label}
                  >
                    {label}:
                  </span>
                  <span
                    className={`text-truncate value ${
                      !data[key] || data[key] === "" ? "text-muted" : ""
                    }`}
                    title={data[key] ? data[key] : "N/A"}
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

export default Personalblock;
