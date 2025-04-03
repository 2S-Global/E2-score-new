import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const KeySkillsModal = ({ show, onClose }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");

  const allskills = [
    "Project Management",
    "Team Leadership",
    "Technical Skills",
    "Leadership",
    "Public Speaking",
    "Networking",
    "Marketing",
    "Sales",
    "Product Management",
    "UX/UI Design",
    "Data Analysis",
    "Web Development",
    "Software Engineering",
  ];

  const suggestedSkills = [
    "Startup",
    "Web Designing",
    "Mobile Development",
    "Computer Science",
  ];

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSelectSuggested = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSave = () => {
    if (skills.length === 0) {
      setError("Please specify at least one Key Skill.");
    } else {
      console.log("Saved Skills:", skills);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <>
      <style>
        {`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }
`}
      </style>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Key Skills</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ color: "black" }}>
                Add skills that define your expertise (Minimum 1)
              </p>

              {/* Skills List */}
              <div className="mb-3">
                {skills.map((skill, index) => (
                  <span key={index} className="badge bg-secondary me-2 p-2">
                    {skill}{" "}
                    <button
                      className="btn btn-sm btn-light ms-2"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Skill Input & Dropdown */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control custom-textarea"
                  placeholder="Enter or select a skill"
                  value={newSkill}
                  onChange={(e) => {
                    const selectedSkill = e.target.value;
                    if (
                      allskills.includes(selectedSkill) &&
                      !skills.includes(selectedSkill)
                    ) {
                      setSkills([...skills, selectedSkill]);
                      setNewSkill("");
                      setError("");
                    } else {
                      setNewSkill(selectedSkill);
                    }
                  }}
                  list="skills-list"
                />
                <datalist id="skills-list">
                  {allskills.map((skill, index) => (
                    <option key={index} value={skill} />
                  ))}
                </datalist>
              </div>

              {error && <p className="text-danger">{error}</p>}

              {/* Suggested Skills */}
              <div className="mt-3">
                <p style={{ color: "black" }}>
                  Or select from suggested skills:
                </p>
                {suggestedSkills.map((skill, index) => (
                  <button
                    key={index}
                    className="btn btn-outline-secondary m-1"
                    onClick={() => handleSelectSuggested(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={skills.length === 0}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeySkillsModal;
