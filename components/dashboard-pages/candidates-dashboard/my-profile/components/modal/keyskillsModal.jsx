import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";

const KeySkillsModal = ({ show, onClose, selectedSkills }) => {
  const [skills, setSkills] = useState(selectedSkills || []);
  const [allskills, setAllskills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load random skills initially
    setLoading(true);
    axios
      .get(`${apiurl}/api/sql/dropdown/Random_Skill`)
      .then((response) => {
        setAllskills(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching random skills:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmed = newSkill.trim();
      if (trimmed.length > 0) {
        axios
          .get(
            `${apiurl}/api/sql/dropdown/matching_Skill?skill_name=${trimmed}`
          )
          .then((response) => {
            setAllskills(response.data.data || []);
          })
          .catch((error) => {
            console.error("Error fetching matching skills:", error);
          });
      } else {
        axios
          .get(`${apiurl}/api/sql/dropdown/Random_Skill`)
          .then((response) => {
            setAllskills(response.data.data || []);
          })
          .catch((error) => {
            console.error("Error restoring random skills:", error);
          });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [newSkill]);

  const suggestedSkills = [
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
      onClose(skills);
    }
  };

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
    setError("");
  };

  const handleAddNewSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    } else if (skills.includes(trimmed)) {
      setError("This skill is already added.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewSkill();
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
                onClick={() => onClose(skills)}
              ></button>
            </div>
            <div className="modal-body">
              {loading ? (
                <CustomizedProgressBars />
              ) : (
                <>
                  <p style={{ color: "black" }}>
                    Add skills that define your expertise (Minimum 1)
                  </p>

                  {/* Selected Skills */}
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

                  {/* Input and Add Button */}
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control custom-textarea"
                      placeholder="Enter or select a skill"
                      value={newSkill}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      list="skills-list"
                    />
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleAddNewSkill}
                    >
                      Add
                    </button>
                  </div>

                  <datalist id="skills-list">
                    {allskills.map((skill, index) => (
                      <option key={index} value={skill} />
                    ))}
                  </datalist>

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
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => onClose(skills)}
              >
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
