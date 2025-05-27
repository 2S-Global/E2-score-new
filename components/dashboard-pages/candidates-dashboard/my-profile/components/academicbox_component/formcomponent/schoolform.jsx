import React, { useState, useEffect } from "react";
import UploadButton from "../UploadButton";

const SchoolForm = ({
  formData,
  setFormData,
  handleChange,
  listboard,
  listmedium,
  stateselected,
}) => {
  return (
    <>
      {!stateselected && (
        <div className="col-md-12">
          <span style={{ color: "red" }}>Please select a state</span>
        </div>
      )}
      <div
        className="row"
        style={{
          pointerEvents: !stateselected ? "none" : "auto",
          opacity: !stateselected ? 0.5 : 1,
        }}
      >
        <div className="form-group ">
          <label>Board</label>
          <span style={{ color: "red" }}>*</span>
          <select onChange={handleChange} name="board" value={formData.board}>
            <option value="">Select Board</option>
            {listboard?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.board_name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label>
              Year of Passing
              <span style={{ color: "red" }}>*</span>
            </label>

            <select
              className="form-control"
              name="year_of_passing"
              onChange={handleChange}
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
          <div className="form-group col-md-6">
            <label>
              Medium of Education
              <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="medium"
              onChange={handleChange}
              value={formData.medium}
            >
              <option>Select Medium</option>
              {listmedium.map((medium) => (
                <option key={medium.id} value={medium.id}>
                  {medium.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* marks */}
        <div className="form-group">
          <label>
            Marks
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="marks"
            placeholder="Enter Marks"
            onChange={handleChange}
            value={formData.marks}
          />
        </div>
        {formData.level == 2 && (
          <>
            <div className="row">
              <div className="form-group col-md-6">
                <label>
                  Marks in English
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="eng_marks"
                  placeholder="Enter Marks"
                  onChange={handleChange}
                  value={formData.eng_marks}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  Marks in Math
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="math_marks"
                  placeholder="Enter Marks"
                  onChange={handleChange}
                  value={formData.math_marks}
                />
              </div>
            </div>
          </>
        )}
        <div className="form-group col-lg-6">
          <label>
            Transcript
            <span style={{ color: "red" }}>*</span>
          </label>
          <UploadButton
            label="Upload"
            id="transcript"
            name="transcript"
            file={formData.transcript}
            onChange={(e) =>
              setFormData({ ...formData, transcript: e.target.files[0] })
            }
            accept="image/*, .pdf"
            width="200px"
          />
        </div>
        <div className="form-group col-lg-6">
          <label>
            Certificate
            <span style={{ color: "red" }}>*</span>
          </label>
          <UploadButton
            label="Upload"
            id="certificate"
            name="certificate"
            width="200px"
            file={formData.certificate}
            onChange={(e) =>
              setFormData({ ...formData, certificate: e.target.files[0] })
            }
            accept="image/*, .pdf"
          />
        </div>
      </div>
    </>
  );
};

export default SchoolForm;
