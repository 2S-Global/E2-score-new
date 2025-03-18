"use client";
import React, { useState } from "react";
import ResumeHeadline from "./modal/resumeheadline"; // Import the modal component
import "bootstrap/dist/css/bootstrap.min.css";
import Profilesum from "./modal/profilesum";




const ProfilesumerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resumeHeadline = "Highlight your key career achievements to help employers know your potential";

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
            <h4>Profile summary</h4>
            {/* Open modal using an onClick function */}
            <span 
              onClick={openModalRH} 
              style={{
                cursor: "pointer",
                float: "right",
                color: "#275df5",
                fontWeight: 700,
                fontSize: "16px"
              }}
            >
              Add profile summary
            </span>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
            <p>{resumeHeadline}</p>
          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && <Profilesum show={isModalOpen} onClose={closeModalRH} />}
    </>
  );
};

export default ProfilesumerySection;
