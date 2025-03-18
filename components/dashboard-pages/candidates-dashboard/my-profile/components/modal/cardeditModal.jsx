import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cardedit = ({ show, onClose }) => {
    const [fullname, setFullname] = useState("Abhishek Dey");
 const [selectedGender, setSelectedGender] = useState("Male");

  if (!show) return null;


  const handleSelect = (type, value, e) => {
    e.preventDefault();
    if (type === "gender") setSelectedGender(value);
    if (type === "marital") setSelectedMaritalStatus(value);
    if (type === "info") {
      setSelectedInfo((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  const old_locations = [
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Japan",
    "Mexico",
    "Poland",
    "Russia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Brazil",
    "China",
    "India",
    "Indonesia",
    "Korea",
    "Philippines",
    "Singapore",
    "Thailand",
    "United Arab Emirates",
    "Vietnam",
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela"
  ];

  return (
    <>
    <style>
        {`
          .custom-textarea::placeholder {
            color: #c7c5c5!important;
            font-size: 15px !important;
          }
          .option-btn {
            border: 1px solid #8c8c8c;
            color: #333;
            background: white;
            font-size: 15px;
            padding: 6px 15px;
            transition: all 0.2s ease-in-out;
          }
          .option-btn.active {
            background: #f0efff;
            font-weight: bold;
            border-color: #635bff;
            color: black;
          }
          .info-btn {
            border: 1px solid #a5a5a5;
            background: white;
            color: #333;
            font-size: 14px;
            padding: 6px 12px;
            transition: all 0.2s ease-in-out;
          }
          .info-btn.active {
            background: #eaeafc;
            font-weight: bold;
            border-color: #635bff;
            color: black;
          }
        `}
      </style>

    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">All about you</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Fullname */}
            <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  id="fullname"
                  placeholder="Enter your full name"
                />
            </div>

            {/* Gender Selection */}
            <div className="mb-3">
                <label className="form-label"><b>Gender</b></label>
                  <div className="d-flex gap-2 flex-wrap">
                    {["Male", "Female", "Transgender"].map((gender) => (
                      <button
                        key={gender}
                        onClick={(e) => handleSelect("gender", gender, e)}
                        className={`btn option-btn rounded-pill ${
                          selectedGender === gender ? "active" : ""
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                          {/* Date of Birth Section */}
<div className="mb-3">
<label className="form-label"><b>Date of Birth</b></label>
  <div className="d-flex gap-2">
    <select className="form-select">
      {[...Array(31)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
    <select className="form-select">
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
        <option key={i} value={month}>{month}</option>
      ))}
    </select>
    <select className="form-select">
      {[...Array(70)].map((_, i) => (
        <option key={i} value={2000 - i}>{2000 - i}</option>
      ))}
    </select>
  </div>
</div>
{/* ckeckbox */}
<div className="mb-3">
                            <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value="remember-me"
                                  id="rememberMe"
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                Currently residing in India
                                </label>
                            </div>
                            

                          </div>
                          {/*Country Drop Down */}
                          <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <select
                  className="form-select"
                  id="country"
                >
                    {old_locations.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                </div>
                {/* current location */}
                <div className="mb-3">
                    <label htmlFor="currentLocation" className="form-label">Current Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentLocation"
                      placeholder="Enter your current location"
                    />
                </div>
                {/* Home-Town */}
                <div className="mb-3">
                    <label htmlFor="homeTown" className="form-label">Hometown</label>
                    <input
                      type="text"
                      className="form-control"
                      id="homeTown"
                      placeholder="Enter your home-town"
                    />
                </div>
                {/* Mobile no */}
                <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">Mobile No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobileNo"
                      placeholder="Enter your mobile number"
                    />
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

export default Cardedit;
