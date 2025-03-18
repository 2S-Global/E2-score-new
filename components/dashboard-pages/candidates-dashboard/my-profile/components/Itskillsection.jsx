"use client";
import React, { useState } from "react";
import ItskillModal from "./modal/ItskillModal";






const ItkeySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };


  const userdata =[{
    "skill" : "PHP",
    "version" : "1.0",
    "last_used" : "2025",
    "experience" : "1 year 7 months"
  },
  {
    "skill" : "JavaScript",
    "version" : "ES6",
    "last_used" : "2025",
    "experience" : "2 years 4 months"
  },
  {
    "skill" : "ReactJS",
    "version" : "16.13.1",
    "last_used" : "2025",
    "experience" : "1 year 11 months"
  }
];

  return (
    <>
      {/* Resume Headline Section */}
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>IT skills</h4>
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
              Add details
            </span>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
            <div className="table-responsive">
            <table className="table">
  <thead>
    <tr className="border-bottom">
      <th className="border-bottom">Skill</th>
      <th className="border-bottom">Version</th>
      <th className="border-bottom">Last Used</th>
      <th className="border-bottom">Experience</th>
      <th className="border-bottom"></th>
    </tr>
  </thead>
  <tbody>
    {userdata.map((skill, index) => (
      <tr key={index}>
        <td>{skill.skill}</td>
        <td>{skill.version}</td>
        <td>{skill.last_used}</td>
        <td>{skill.experience}</td>
        <td> <i 
              className="la la-pencil-alt" 
              onClick={openModalRH} 
              style={{ cursor: "pointer" }} 
            ></i></td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
            






          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && <ItskillModal show={isModalOpen} onClose={closeModalRH} />}
    </>
  );
};

export default ItkeySection;
