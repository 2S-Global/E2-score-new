import React from "react";

const UploadButton = ({
  label,
  id,
  file,
  onChange,
  accept,
  width = "340px",
}) => (
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
      <label
        className="uploadButton-button ripple-effect"
        style={{ width }}
        htmlFor={id}
      >
        {file ? file.name : `Browse..`}
      </label>
    </div>
  </div>
);

export default UploadButton;
