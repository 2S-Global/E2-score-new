import React from "react";

const DocumentUpload = ({ label, name, fileId }) => {
    return (
        <div className="row">
            {/* headeing */}
            <div className="col-lg-12 col-md-12">
                <h3 className="text-center mb-4" style={{ textDecoration: "underline" }}>
                    {label}
                </h3>
            </div>
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
                <label>{label}</label>
                <input type="text" name={name} placeholder={`Enter Name on ${label}`} className="form-control" />
            </div>
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
                <label>{label} Number</label>
                <input type="text" name={`${name}-number`} placeholder={`Enter ${label} Number`} className="form-control" />
            </div>
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
                <label htmlFor={fileId}>Upload {label}</label>
                <div className="uploadButton d-flex align-items-center">
                    <input className="uploadButton-input" type="file" name={`${name}-attachment`} accept="image/*" id={fileId} required />
                    <label className="uploadButton-button ripple-effect" htmlFor={fileId} style={{ width: "100%", height: "60px" }}>
                        Browse {label}..
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DocumentUpload;
