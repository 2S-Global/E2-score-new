import React, { useState, useEffect } from "react";

import { Trash2 } from "lucide-react";
const PassdocumentUpload = ({
  label,
  name,
  fileId,
  onFileChange,
  valuename,
  numbername,
  onfieldChange,
  numberError,
  onfieldValidation,
  disabled,
  formData = {},
}) => {
  const [inputKey, setInputKey] = useState(Date.now());
  const [documentData, setDocumentData] = useState({
    docName: "",
    docNumber: "",
    file: null,
    filePreview: null,
  });

  const [isSameAsFullName, setIsSameAsFullName] = useState(false);

  useEffect(() => {
    if (isSameAsFullName) {
      onfieldChange({
        target: {
          name: `${name}name`,
          value: formData.name || "",
        },
      });
    }
  }, [formData.name, isSameAsFullName]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocumentData({
        ...documentData,
        file,
        filePreview: fileURL,
      });

      if (onFileChange) {
        onFileChange(name, file);
      }
    }
  };
const handleCheckboxChange = (e) => {
  const checked = e.target.checked;
  setIsSameAsFullName(checked);

  if (!checked) {
    onfieldChange({
      target: {
        name: `${name}name`,
        value: "",
      },
    });
  }
};
  return (
    <div
      className="row"
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Heading */}
      {/* Document Number Input */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label>Passport File Number</label>
        <input
          type="text"
          name={`${name}number`}
          placeholder={`Enter ${label} Number`}
          className="form-control"
          value={numbername}
          onChange={onfieldChange}
          onBlur={onfieldValidation}
          disabled={disabled}
        />

        {numberError && (
          <small className="text-danger" style={{ marginTop: "4px" }}>
            {numberError}
          </small>
        )}
      </div>
      {/* Name Input */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label>Name as per Passport </label>
        <div className="">
          <input
            type="text"
            name={`${name}name`}
            placeholder={`Enter Name as per ${label}`}
            className="form-control"
            value={valuename}
            onChange={onfieldChange}
            autoComplete="off"
            disabled={isSameAsFullName || disabled} // lock editing when checkbox checked
          />
          <div className="form-check me-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={`${name}-sameAsFullName`}
              checked={isSameAsFullName}
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
            <label
              className="form-check-label"
              htmlFor={`${name}-sameAsFullName`}
            >
              Same as Full Name
            </label>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label htmlFor={fileId}>Upload Passport File</label>
        <div className="uploadButton d-flex align-items-center">
          <input
            key={inputKey}
            className="uploadButton-input"
            type="file"
            name="file"
            accept="image/*"
            id={fileId}
            onChange={handleFileSelect}
          />
          <label
            className="uploadButton-button ripple-effect"
            htmlFor={fileId}
            style={{ width: "100%", height: "54px", cursor: "pointer" }}
          >
            {documentData.file ? (
              <span
                onClick={() => window.open(documentData.filePreview, "_blank")}
              >
                {documentData.file.name}
              </span>
            ) : (
              `Browse Passport File`
            )}
          </label>
          {documentData.file ? (
            <Trash2
              className="text-danger "
              size={20}
              onClick={() => {
                setDocumentData({
                  ...documentData,
                  file: null,
                  filePreview: null,
                });
                setInputKey(Date.now());
                if (onFileChange) {
                  onFileChange(name, null); // Notify parent
                }
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PassdocumentUpload;
