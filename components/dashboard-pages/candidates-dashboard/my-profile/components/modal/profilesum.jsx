import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";

const Profilesum = ({ show, onClose }) => {
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

  return (
    <>
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
            <h5 className="modal-title">Profile summary</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p style={{ color: 'black' }}>
            Give recruiters a brief overview of the highlights of your career, key achievements, and career goals to help recruiters know your profile better.  </p>

            {/* Textarea Input */}
            <div className="mb-3">
              <textarea
                className="form-control custom-textarea"
                placeholder="Type here..."
                value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsGenerated(false); // Reset when user types
              }}
                maxLength={1000}
                style={{ height: "100px" }}
              />
              <div className="row">
                <div className="col-sm-6">
                <button type="button" className="suggestion-btn" onClick={handleGenerateHeadline}>
                                <Sparkles />
                                {isGenerated ? "Clear" : "Help me write"}
                              </button>
                 
                </div>
                <div className="col-sm-6">
                <small className="text-muted d-block text-end">
                {1000 - headline.length} character(s) left
              </small>

                  </div>
                  
  
              </div>
             
             
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
              disabled={headline.trim().split(" ").length < 5}
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

export default Profilesum;
