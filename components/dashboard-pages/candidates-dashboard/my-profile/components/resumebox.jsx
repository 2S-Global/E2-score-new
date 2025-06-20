"use client";

import { useState, useCallback } from "react";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";

const ResumeBox = () => {
  const [loading, setLoading] = useState(false);
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

  const UploadButton = ({
    label,
    id,
    file,
    onChange,
    accept,
    width = "340px",
  }) => (
    <div className="form-group ">
      <div className="uploadButton">
        <input
          className="uploadButton-input"
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          required
        />
        <label
          className="uploadButton-button ripple-effect"
          style={{ width }}
          htmlFor={id}
        >
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
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Resume</h4>
            {/* Open modal using an onClick function */}
          </div>
          {loading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                {transcriptFile && (
                  <div className="resume-details">
                    <p className="resume-file">{transcriptFile.name}</p>
                    {uploadDate && (
                      <p className="upload-date">Uploaded on {uploadDate}</p>
                    )}
                    <div className="resume-actions">
                      <a
                        href={URL.createObjectURL(transcriptFile)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📥 Download
                      </a>
                      <button onClick={handleDelete} className="delete-btn">
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                )}
                <div
                  className="upload-wrapper d-flex justify-content-center"
                  style={{ width: "100%" }}
                >
                  <UploadButton
                    label="Upload Resume"
                    id="resume"
                    file={transcriptFile}
                    onChange={handleFileChange}
                    accept="image/*, .pdf"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeBox;
