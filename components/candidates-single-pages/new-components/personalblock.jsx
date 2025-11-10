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

  useEffect(() => {
    const newLine = getCareerBreakLine(data);
    if (newLine !== data.carrerbreakline) {
      setData((prev) => ({
        ...prev,
        carrerbreakline: newLine,
      }));
    }
  }, [data]);

  // Define display names for your known fields
  const fieldLabels = {
    more_info: "More Information",
    marital_status: "Marital Status",
    category: "Category",
    differently_abled: "Original D/A",
    differentlyAbledline: "Differently Abled",
    career_break: "Original C/B",
    carrerbreakline: "Career Break",
    usaworkpermitline: "USA Work Permit",
    work_permit_other_countries: "Other County Work Permit",
    permanent_address: "Permanent address",
    pincode: "Pincode",
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

export default Personalblock;
