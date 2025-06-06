"use client";
import React, { useState } from "react";

import ProjectModal from "./modal/projectModal";

const ProjectSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resumeHeadline =
    "Stand out to employers by adding details about projects that you have done so far";

  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  return (
    <>
      {/* Resume Headline Section */}
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Projects</h4>
            {/* Open modal using an onClick function */}
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
              Add
            </span>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
            <p>{resumeHeadline}</p>
          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <ProjectModal show={isModalOpen} onClose={closeModalRH} />
      )}
    </>
  );
};

export default ProjectSection;
