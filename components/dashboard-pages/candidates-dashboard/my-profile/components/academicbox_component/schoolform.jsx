import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";
const SchoolForm = ({
  item,
  handleChange,
  transcriptFile,
  formData,
  setFormData,
  setTranscriptFile,
  certificateFile,
  setCertificateFile,
}) => {
  return (
    <>
      <div className="form-group ">
        <label>Board</label>
        <select
          className="form-control"
          value={formData.board}
          onChange={(e) => handleChange(item.id, "board", e.target.value)}
        >
          <option>Select Board</option>
          {["CBSE", "ICSE", "State Board"].map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Year of Passing</label>

        <select
          className="form-control"
          onChange={(e) =>
            handleChange(item.id, "year_of_passing", e.target.value)
          }
          value={formData.year_of_passing}
        >
          <option>Select Year</option>
          {Array.from(
            { length: 61 },
            (_, i) => new Date().getFullYear() - 50 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* school medium */}
      <div className="form-group">
        <label>Medium of Education</label>
        <select
          className="form-control"
          onChange={(e) => handleChange(item.id, "medium", e.target.value)}
          value={formData.medium}
        >
          <option>Select Medium</option>
          {["Hindi", "English", "Marathi", "Telugu", "Other"].map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
        </select>
      </div>
      {/* marks */}
      <div className="form-group ">
        <label>Marks</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Marks"
          onChange={(e) => handleChange(item.id, "marks", e.target.value)}
          value={formData.marks}
        />
      </div>
      {item.level == 2 && (
        <>
          <div className="form-group">
            <label>Marks in English</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Marks in English"
              onChange={(e) =>
                handleChange(item.id, "eng_marks", e.target.value)
              }
              value={formData.eng_marks}
            />
          </div>
          <div className="form-group">
            <label>Marks in Math</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Marks in Math"
              value={formData.math_marks}
              onChange={(e) =>
                handleChange(item.id, "math_marks", e.target.value)
              }
            />
          </div>
        </>
      )}

      {/* Upload Buttons */}
      <div className="form-group col-lg-6">
        <label>Upload Transcript</label>
        <UploadButton
          label="Transcript"
          id={`transcript-${item.id}`}
          file={formData.transcript}
          onChange={(e) =>
            setFormData({ ...formData, transcript: e.target.files[0] })
          }
          accept="image/*, .pdf"
          width="150px"
        />
      </div>

      <div className="form-group col-lg-6">
        <label>Upload Certificate</label>
        <UploadButton
          width="150px"
          label="Certificate"
          id={`certificate-${item.id}`}
          file={formData.certificate}
          onChange={(e) =>
            setFormData({ ...formData, certificate: e.target.files[0] })
          }
          accept="image/*, .pdf"
        />
      </div>
    </>
  );
};

export default SchoolForm;
