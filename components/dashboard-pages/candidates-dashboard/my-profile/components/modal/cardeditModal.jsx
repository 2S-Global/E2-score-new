import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizedProgressBars from "@/components/common/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Cardedit = ({ show, onClose }) => {
  const [countries, setCountries] = useState([]);
  const [isResidingInIndia, setIsResidingInIndia] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    dob: null,
    country: "",
    currentLocation: "",
    hometown: "",
    mobile: "",
  });

  useEffect(() => {
    if (isResidingInIndia) {
      setFormData((prev) => ({ ...prev, country: 102 }));
    }
  }, [isResidingInIndia]);

  const [loading, setLoading] = useState(true);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!show) return null;

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/locations/All_contry`);
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [apiurl]);

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const handleCheckboxChange = (e) => {
    setIsResidingInIndia(e.target.checked);
  };

  const handleCountryChange = (e) => {
    setFormData((prev) => ({ ...prev, country: parseInt(e.target.value) }));
  };
  const handleSelect = (type, value, e) => {
    e.preventDefault();
    if (type === "gender")
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));

    if (type === "marital") setSelectedMaritalStatus(value);
    if (type === "info") {
      setSelectedInfo((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };
  const handleDateChange = (date) => {
    if (date) {
      setFormData({ ...formData, dob: date }); // Store raw Date object
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "full_name") {
      const onlyLetters = /^[A-Za-z\s]*$/; // Allow letters and spaces only

      if (!onlyLetters.test(value)) {
        return; // Don't update state if invalid character
      }
    }

    if (name === "phone") {
      const onlyNumbers = /^[0-9]*$/; // Only numbers allowed

      // If value contains any non-numeric characters, prevent update
      if (!onlyNumbers.test(value)) {
        return; // Don't update state if invalid character
      }

      // Check for exact 10 characters
      if (value.length > 10) {
        return; // Prevent more than 10 characters
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">All About You</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {loading ? (
                <CustomizedProgressBars />
              ) : (
                <>
                  {/* Fullname */}
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">
                      <b>Full Name</b>
                    </label>
                    <input
                      name="full_name"
                      type="text"
                      className="form-control"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      id="full_name"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {/* Gender Selection */}
                  <div className="mb-3">
                    <label className="form-label">
                      <b>Gender</b>
                    </label>
                    <div className="d-flex gap-2 flex-wrap">
                      {["Male", "Female", "Transgender"].map((gender) => (
                        <button
                          key={gender}
                          onClick={(e) => handleSelect("gender", gender, e)}
                          className={`btn option-btn rounded-pill ${
                            formData.gender === gender ? "active" : ""
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date of Birth Section */}
                  <div className="mb-3">
                    <label className="form-label d-block">
                      <b>Date of Birth</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      selected={formData.dob ? new Date(formData.dob) : null}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      maxDate={eighteenYearsAgo}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      required
                      placeholderText="dd/mm/yyyy"
                      width="100%"
                      withPortal
                    />
                  </div>

                  {/* ckeckbox */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        checked={isResidingInIndia}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Currently residing in India
                      </label>
                    </div>
                  </div>

                  {!isResidingInIndia && (
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                      >
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* current location */}
                  <div className="mb-3">
                    <label htmlFor="currentLocation" className="form-label">
                      Current Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentLocation"
                      placeholder="Enter your current location"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      name="currentLocation"
                    />
                  </div>
                  {/* Home-Town */}
                  <div className="mb-3">
                    <label htmlFor="hometown" className="form-label">
                      Hometown
                    </label>
                    <input
                      name="hometown"
                      type="text"
                      className="form-control"
                      id="hometown"
                      placeholder="Enter your home-town"
                      value={formData.hometown}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Mobile no */}
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      name="mobile"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
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
