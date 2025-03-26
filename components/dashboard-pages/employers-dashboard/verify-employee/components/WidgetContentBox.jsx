import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DocumentUpload from "./document";


const WidgetContentBox = () => {
  const [dob, setDob] = useState(null);

  return (
    <div className="widget-content">
      <div className="row">
        <form className="default-form">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h3 className="text-center mb-4" style={{ textDecoration: "underline" }}>
                Personal Details
              </h3>
            </div>
            {/* Full Name Input */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter Employee Name" className="form-control" />
            </div>
            {/* Date of Birth Input with Date Picker */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Date of Birth</label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                placeholderText="Select Date of Birth"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
            {/* Phone no */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Phone Number</label>
              <input type="number" name="name" placeholder="Enter Employee Name" className="form-control" />
            </div>
            {/* Email */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Email</label>
              <input type="email" name="name" placeholder="Enter Employee Email" className="form-control" />
            </div>
            {/* Address */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Address</label>
              <input type="text" name="address" placeholder="Enter Employee Address" className="form-control" />
            </div>
            {/* Gender */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label htmlFor="gender">Gender</label>
              <select className="form-control" id="gender" name="gender">
                <option value="">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <DocumentUpload label="PAN" name="pan" placeholder="Enter Employee Name" fileId="upload-pan" />
          <DocumentUpload label="Aadhaar" name="aadhaar" placeholder="Enter Employee Name" fileId="upload-aadhaar" />
          <DocumentUpload label="Voter ID" name="voter" placeholder="Enter Employee Name" fileId="upload-voter" />
          <DocumentUpload label="Driving License" name="license" placeholder="Enter Employee Name" fileId="upload-license" />
          <DocumentUpload label="Passport File" name="passport" placeholder="Enter Employee Name" fileId="upload-passport" />






          {/* Submit Button */}
          <div className="form-group col-lg-12 d-flex justify-content-start mt-3">
            <button type="submit" className="theme-btn btn-style-one">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetContentBox;