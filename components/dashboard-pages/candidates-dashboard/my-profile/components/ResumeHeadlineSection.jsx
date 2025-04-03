"use client";
import React, { useState } from "react";
import ResumeHeadline from "./modal/resumeheadline"; // Import the modal component

const ResumeHeadlineSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resumeHeadline = "Your Resume headline";

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
            <h4>Resume Headline</h4>
            {/* Open modal using an onClick function */}
            <i
              className="la la-pencil-alt"
              onClick={openModalRH}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
            <p>{resumeHeadline}</p>
          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <ResumeHeadline show={isModalOpen} onClose={closeModalRH} />
      )}
    </>
  );
};

export default ResumeHeadlineSection;
