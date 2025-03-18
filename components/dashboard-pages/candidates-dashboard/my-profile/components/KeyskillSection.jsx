"use client";
import React, { useState } from "react";
import KeySkillsModal from "./modal/keyskillsModal"; // Import the modal component






const Keyskillsection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const keyskill = [
    "Web Development",
    "Software Development",
    "Java",
    "Javascript",
    "CSS",
  ];
  

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
            <h4>Key Skills</h4>
            {/* Open modal using an onClick function */}
            <i className="la la-pencil-alt" onClick={openModalRH} style={{ cursor: "pointer" }}></i>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
  {keyskill.map((skill, index) => (
    <span key={index} style={{ padding: "8px 8px", border: "1px solid #ccc", borderRadius: "10px" }}>
      {skill}
    </span>
  ))}
</div>

          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && <KeySkillsModal show={isModalOpen} onClose={closeModalRH} />}
    </>
  );
};

export default Keyskillsection;
