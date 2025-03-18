import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";

const ProjectModal = ({ show, onClose }) => {
  const [headline, setHeadline] = useState("");

    const [description, setDescription] = useState("");
     const [isGenerated, setIsGenerated] = useState(false); // Track button presses
    
     const handleGenerateHeadline = () => {
      if (isGenerated) {
        setDescription(""); // Clear text if pressed again
        setIsGenerated(false);
      } else {
        setDescription("Developed and deployed a scalable web application using React.js and Node.js, ensuring high performance and seamless user experience. Designed and implemented RESTful APIs, optimized database queries, and integrated third-party services for enhanced functionality. Focused on system architecture, security, and responsive UI/UX to deliver a robust and efficient solution.");
        setIsGenerated(true);
      }
    };


  if (!show) return null;

  return (<>
  <style>
{`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }

   .suggestion-btn {
            
            bottom: -0px;
            left: 10;
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #e8f0fe;
            color: #1a73e8;
            border-radius: 20px;
            padding: 6px 12px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          .suggestion-btn:hover {
            background-color: #d2e3fc;
          }

          .suggestion-btn svg {
            width: 16px;
            height: 16px;
          }
`}
</style>

    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Project</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p style={{ color: 'black' }}>
            Stand out for employers by adding details about projects you have done in college, internships, or at work
            </p>
            <div className="form-group">
                {/* Project title */}
                <label htmlFor="projectTitle">Project Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTitle"
                  placeholder="Enter project title"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                  ></input>
            </div>
            {/* Tag this project with your employment/education */}
            <div className="form-group">
                <label htmlFor="projectTag">Tag this project with your employment/education:</label>
                <select
                  className="form-control"
                  id="projectTag"
                  required
                >
                    <option value="">Select your role/education</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="work">Work</option>
                    <option value="internship">Internship</option>
                    <option value="graduate">Graduate</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                </select>
            
            </div>
            {/* Client */}
            <div className="form-group">
                <label htmlFor="projectClient">Client:</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectClient"
                  placeholder="Enter client name"
                  ></input>
            </div>
            {/* Project status*/}
            <div className="form-group">
                <label htmlFor="projectStatus">Project Status:</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="projectStatus1"
                        name="projectStatus"
                        value="ongoing"
                        required
                    />
                    <label className="form-check-label" htmlFor="projectStatus1">
                        Ongoing
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="projectStatus2"
                        name="projectStatus"
                        value="completed"
                        required
                    />
                    <label className="form-check-label" htmlFor="projectStatus2">
                        Completed
                    </label>
                    </div>
                   

      
            </div>

            {/* Worked from */}
<div className="form-group">
    <label htmlFor="workedFromYear">Worked from</label>
    <div className="row">
        {/* Year Dropdown */}
        <div className="col-md-6">
            <select className="form-control" id="workedFromYear" required>
                <option value="">Select Year</option>
                {Array.from({ length: 26 }, (_, i) => i + 2000).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
        
        {/* Month Dropdown */}
        <div className="col-md-6">
            <select className="form-control" id="workedFromMonth" required>
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                ))}
            </select>
        </div>
    </div>
</div>

{/* work till */}
<div className="form-group">
    <label htmlFor="workedFromYear">Worked till</label>
    <div className="row">
        {/* Year Dropdown */}
        <div className="col-md-6">
            <select className="form-control" id="workedFromYear" required>
                <option value="">Select Year</option>
                {Array.from({ length: 26 }, (_, i) => i + 2000).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
        
        {/* Month Dropdown */}
        <div className="col-md-6">
            <select className="form-control" id="workedFromMonth" required>
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                ))}
            </select>
        </div>
    </div>
</div>

           {/* Description */}
           <div className="form-group">
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              className="form-control"
              id="projectDescription"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsGenerated(false); // Reset when user types
              }}
              rows="5"
              placeholder="Enter project description"
              required
            ></textarea>
            <button type="button" className="suggestion-btn" onClick={handleGenerateHeadline}>
                                <Sparkles />
                                {isGenerated ? "Clear" : "Help me write"}
                              </button>
           </div>

          


           
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
              
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

export default ProjectModal;
