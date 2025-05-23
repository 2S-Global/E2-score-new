"use client";
import React, { useState } from "react";
import EducationModal from "./modal/EducationModal"; // Import the modal component

const Academysection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState({}); // Track expanded descriptions

  const userdata = [
    {
      level: "B.Tech/B.E",
      course: "Computer Science and Engineering",
      institution: "National Institute of Technology, Rourkela",
      year: "2018-2022",
      type: "Full Time",
    },
    {
      level: "Class XII",
      Board: "CISCE(ICSE/ISC)",
      year: "2018",
    },
    {
      level: "Class X",
      Board: "CISCE(ICSE/ISC)",
      year: "2016",
    },
  ];
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle expanded state for the specific item
    }));
  };

  return (
    <>
      {/* Resume Headline Section */}
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Education</h4>
            <span
              onClick={openModalRH}
              style={{
                cursor: "pointer",
                float: "right",
                color: "#275df5",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              Add education
            </span>
          </div>

          {/* Display Resume Headline */}
          <div className="widget-content">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <div className="resume-content">
                {userdata.map((item, index) => (
                  <div key={index} className="resume-item emp-list pb-3">
                    {/* Job Title and Edit Icon */}
                    <div className="item title typ-14Bold">
                      <span className="truncate emp-desg" title={item.level}>
                        <strong>
                          {item.level} {item.course}
                        </strong>
                      </span>
                      <i
                        className="la la-pencil-alt"
                        onClick={openModalRH}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>

                    {/* Job Type and Duration */}
                    <div className="item experienceType typ-14Regular">
                      <span className="truncate expType">
                        {item.institution} {item.Board}
                      </span>
                      <br />
                      <span className="truncate">
                        {item.year} {item.type && ` | ${item.type}`}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Add Buttons */}
                <span
                  onClick={openModalRH}
                  style={{
                    cursor: "pointer",
                    display: "block",
                    color: "#275df5",
                    fontWeight: 700,
                    fontSize: "16px",
                    paddingBottom: "10px", // Added bottom padding
                  }}
                >
                  Add doctorate/PhD
                </span>

                <span
                  onClick={openModalRH}
                  style={{
                    cursor: "pointer",
                    display: "block",
                    color: "#275df5",
                    fontWeight: 700,
                    fontSize: "16px",
                    paddingBottom: "10px", // Added bottom padding
                  }}
                >
                  Add masters/post-graduation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <EducationModal show={isModalOpen} onClose={closeModalRH} />
      )}
    </>
  );
};

export default Academysection;
