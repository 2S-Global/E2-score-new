import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchableInput from "../academicbox_component/SearchableInput";

const ItskillModal = ({ show, onClose }) => {
  const [headline, setHeadline] = useState("");

  if (!show) return null;
  
  const allskills = [
    "Project Management", "Team Leadership", "Technical Skills", "Leadership",
    "Public Speaking", "Networking", "Marketing", "Sales", "Product Management",
    "UX/UI Design", "Data Analysis", "Web Development", "Software Engineering"
  ];

  const [filteredSkills, setFilteredSkills] = useState(allskills);
  const [skillSearch, setSkillSearch] = useState("");

  const handleSearchChange = (e, setSearch, setFiltered, list) => {
    const value = e.target.value;
    setSearch(value);
    setFiltered(list.filter((item) => item.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSelect = (value, setSearch, setFiltered) => {
    setSearch(value);
    setFiltered([]);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">IT skills</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p style={{ color: 'black' }}>
              Mention skills like programming languages (Java, Python), software (Microsoft Word, Excel), and more to show your technical expertise.
            </p>
            <SearchableInput 
              label="Skill / software name" 
              value={skillSearch} 
              onChange={(e) => handleSearchChange(e, setSkillSearch, setFilteredSkills, allskills)} 
              options={filteredSkills} 
              onSelect={(value) => handleSelect(value, setSkillSearch, setFilteredSkills)} 
            />
            <div className="row">
                <div className="col-sm-6">
                  {/* Software version */}
                  <div className="form-group">
                    <label>Software version</label>
                    <input type="text" className="form-control" placeholder="e.g., 1.0.0" />
                  </div>
                 </div> 
                 <div className="col-sm-6">
                    {/* Last used */}
                    <div className="form-group">
                      <label>Last used</label>
                      {/* dropdown year 2025 to 1940 */}
                      <select className="form-control">
                        <option>Select year</option>
                        {Array.from({ length: 101 }, (_, i) => i + 1925).reverse().map(year => (
                          <option key={year}>{year}</option>
                        ))}
                      </select>
                      </div>                
                  </div> 
            </div>

            <div className="row">
                <div className="col-sm-6">
                  {/* Software version */}
                  <div className="form-group">
                    <label>Experience</label>
                    {/* year drop down 0 to 30+ */}
                    <select className="form-control">
                        <option>Select years</option>
                        {Array.from({ length: 30 }, (_, i) => i).map(year => (
                          <option key={year}>{year}</option>
                        ))}
                        <option>30+</option>
  
                    </select>

                  </div>
                 </div> 
                 <div className="col-sm-6">
                    {/* Last used */}
                    <div className="form-group">
                    <label></label>
                      {/* dropdown year 2025 to 1940 */}
                      <select className="form-control">
                        <option>Select Month</option>
                        {Array.from({ length: 12 }, (_, i) => i + 0).reverse().map(year => (
                          <option key={year}>{year}</option>
                        ))}
                      </select>
                      </div>                
                  </div> 
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Save
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ItskillModal;