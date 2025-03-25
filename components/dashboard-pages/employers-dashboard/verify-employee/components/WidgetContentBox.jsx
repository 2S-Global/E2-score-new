import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WidgetContentBox = () => {
  const [dob, setDob] = useState(null);

  return (
    <div className="widget-content">
      <div className="row">
        <form className="default-form">
          <div className="row">
            {/* Full Name Input */}
            <div className="form-group col-lg-6 col-md-12 d-flex flex-column">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter Employee Name" className="form-control" />
            </div>

            {/* Date of Birth Input with Date Picker */}
            <div className="form-group col-lg-6 col-md-12 d-flex flex-column">
              <label>Date of Birth</label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                placeholderText="Select Date of Birth"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12 d-flex justify-content-start mt-3">
              <button type="submit" className="theme-btn btn-style-one">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetContentBox;