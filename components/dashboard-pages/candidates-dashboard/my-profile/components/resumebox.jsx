"use client";

import { useState, useCallback } from "react";



const ResumeBox = () => {
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setTranscriptFile(file);
      setUploadDate(
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      );
    }
  }, []);

  const UploadButton = ({ label, id, file, onChange, accept, width = "340px" }) => (
    <div className="form-group col-lg-4 col-md-12">
      <div className="uploadButton">
        <input
          className="uploadButton-input"
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          required
        />
       <label className="uploadButton-button ripple-effect" style={{ width }} htmlFor={id}>
  {file ? file.name : `Browse ${label}..`}
</label>
      </div>
    </div>
  );



  const handleDelete = useCallback(() => {
    setTranscriptFile(null);
    setUploadDate(null);
  }, []);

  return (
    <div className="resume-container">
      <strong className="resume-title">Resume </strong>
      <span style={{ color: "green" }}>
  Add 10%
</span>

      
      {transcriptFile && (
        <div className="resume-details">
          <p className="resume-file">{transcriptFile.name}</p>
          {uploadDate && <p className="upload-date">Uploaded on {uploadDate}</p>}
          <div className="resume-actions">
            <a href={URL.createObjectURL(transcriptFile)} target="_blank" rel="noopener noreferrer">
              📥 Download
            </a>
            <button onClick={handleDelete} className="delete-btn">🗑 Delete</button>
          </div>
        </div>
      )}

      <div className="upload-wrapper">
        <UploadButton
          label="Upload Resume"
          id="resume"
          file={transcriptFile}
          onChange={handleFileChange}
          accept="image/*, .pdf"
        />
      </div>
    </div>
  );
};

export default ResumeBox;
