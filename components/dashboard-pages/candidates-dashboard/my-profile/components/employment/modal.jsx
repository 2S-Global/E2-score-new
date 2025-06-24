/*  */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";
import axios from "axios";
const getComparableDateValue = (year, month) => {
  if (!year || !month) return null;
  return parseInt(year) * 100 + parseInt(month); // e.g., 202405
};

let debounceTimeout;
const EmploymentModal = ({ show, onClose, item = [] }) => {
  const [error, setError] = useState("");
  const [wrongDate, setWrongDate] = useState(false);

  const [isGenerated, setIsGenerated] = useState(false); // Track button presses
  const token = localStorage.getItem("candidate_token");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
  const [formData, setFormData] = useState({
    _id: item._id || "",
    currentlyWorking: item.currentlyWorking || false,
    employmenttype: item.employmenttype || "",
    experience_yr: item.experience_yr || "",
    experience_month: item.experience_month || "",
    company_name: item.company_name || "",
    job_title: item.job_title || "",
    joining_year: item.joining_year || "",
    joining_month: item.joining_month || "",
    leaving_year: item.leaving_year || "",
    leaving_month: item.leaving_month || "",
    description: item.description || "",
  });
  const handleGenerateHeadline = () => {
    if (isGenerated) {
      setFormData({
        ...formData,
        description: "",
      });
      setIsGenerated(false);
    } else {
      setFormData({
        ...formData,
        description:
          "Developed and deployed a scalable web application using React.js and Node.js, ensuring high performance and seamless user experience. Designed and implemented RESTful APIs, optimized database queries, and integrated third-party services for enhanced functionality. Focused on system architecture, security, and responsive UI/UX to deliver a robust and efficient solution.",
      });
      setIsGenerated(true);
    }
  };

  if (!show) return null;

  const handleSave = () => {
    console.log("saving");
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const generateMonthOptions = (selectedYear) => {
    const maxMonth = selectedYear === currentYear ? currentMonth : 12;
    return monthNames.slice(0, maxMonth).map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  useEffect(() => {
    if (formData.currentlyWorking) {
      setError("");
      setWrongDate(false);
    } else {
      const startValue = getComparableDateValue(
        formData.joining_year,
        formData.joining_month
      );
      const endValue = getComparableDateValue(
        formData.leaving_year,
        formData.leaving_month
      );

      if (startValue && endValue) {
        if (startValue > endValue) {
          setError("End date cannot be before start date.");
          setWrongDate(true);
        } else {
          setError("");
          setWrongDate(false);
        }
      }
    }
  }, [
    formData.joining_year,
    formData.joining_month,
    formData.leaving_year,
    formData.leaving_month,
    formData.currentlyWorking,
  ]);

  useEffect(() => {
    if (formData.currentlyWorking) {
      setError("");
    }
  }, [formData.currentlyWorking]);

  /* test  */
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchMatchingCompanies(searchText);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  const fetchMatchingCompanies = async (name) => {
    try {
      const res = await axios.get(
        `${apiurl}/api/candidate/employment/matching_company`,
        {
          params: { company_name: name },
        }
      );
      setSuggestions(res.data.data || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, company_name: value });
    setSearchText(value);
  };

  const handleSuggestionClick = (name) => {
    setFormData({ ...formData, company_name: name });
    setShowDropdown(false);
  };

  return (
    <>
      <style>
        {`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }

   .suggestion-btn {
            position: absolute;
            bottom: -0px;
            left: 10;
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #e8f0fe;
            color: #1a73e8;
            border-radius: 20px;
            padding: 6px 12px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          .suggestion-btn:hover {
            background-color: #d2e3fc;
          }

          .suggestion-btn svg {
            width: 16px;
            height: 16px;
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
            <div className="modal-header">
              <h5 className="modal-title">Employment</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ color: "black" }}>
                Details like job title, company name, etc, help employers
                understand your work
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => console.log("Formdata:", formData)}
              >
                Test
              </button>

              {/* Skills List */}

              <form className="default-form" onSubmit={handleSave}>
                <div className="mb-3 form-group">
                  <label className="form-label">
                    Is this your current employment?
                  </label>

                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyWorking"
                        id="currentYes"
                        value="true"
                        checked={formData.currentlyWorking === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentlyWorking: e.target.value === "true",
                          })
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor="currentlyWorking"
                      >
                        Yes
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyWorking"
                        id="currentNo"
                        value="false"
                        checked={formData.currentlyWorking === false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentlyWorking: e.target.value === "true",
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="currentNo">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3 form-group">
                  <label className="form-label">Employment type</label>

                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="employmenttype"
                        id="currentYes"
                        value="full-time"
                        checked={formData.employmenttype === "full-time"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employmenttype: e.target.value,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="currentYes">
                        Full Time
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="employmenttype"
                        id="currentNo"
                        value="part-time"
                        checked={formData.employmenttype === "part-time"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employmenttype: e.target.value,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="currentNo">
                        Part Time
                      </label>
                    </div>
                  </div>
                </div>

                {/* total Experience year and month drop down */}
                <div className="mb-3 form-group">
                  <label className="form-label">Total Experience</label>

                  <div className="d-flex gap-3">
                    {/* Years Dropdown */}
                    <select
                      className="form-select"
                      name="experience_yr"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience_yr: e.target.value,
                        })
                      }
                    >
                      <option value="">Years</option>
                      {[...Array(50).keys()].map((year) => (
                        <option key={year} value={year}>
                          {year} {year === 1 ? "Year" : "Years"}
                        </option>
                      ))}
                    </select>

                    {/* Months Dropdown */}
                    <select
                      className="form-select"
                      name="experience_month"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience_month: e.target.value,
                        })
                      }
                    >
                      <option value="">Months</option>
                      {[...Array(12).keys()].map((month) => (
                        <option key={month} value={month}>
                          {month} {month === 1 ? "Month" : "Months"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Company name */}
                <div className="mb-3 form-group position-relative">
                  <label className="form-label">Company name</label>
                  <input
                    type="text"
                    className="form-control custom-textarea"
                    placeholder="Enter your company name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    onFocus={() => {
                      if (formData.company_name) {
                        setSearchText(formData.company_name);
                      }
                    }}
                  />

                  {showDropdown && suggestions.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{ zIndex: 1000 }}
                    >
                      {suggestions.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSuggestionClick(item)}
                          style={{ cursor: "pointer" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Job Title */}
                <div className="mb-3 form-group">
                  <label className="form-label">Job title</label>
                  <input
                    type="text"
                    className="form-control custom-textarea"
                    placeholder="Enter your job title"
                    value={formData.job_title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        job_title: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Joining Date*/}
                <div className="mb-3 form-group">
                  <label className="form-label">Joining Date</label>

                  <div className="d-flex gap-3">
                    {/* Years Dropdown (2000 - 2025) */}
                    <select
                      className="form-select form-control "
                      value={formData.joining_year || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          joining_year: e.target.value,
                          joining_month: "", // reset month on year change
                        })
                      }
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = currentYear - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>

                    {/* Months Dropdown (Jan - Dec) */}
                    <select
                      className="form-select form-control"
                      value={formData.joining_month || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          joining_month: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Month</option>
                      {generateMonthOptions(
                        parseInt(formData.joining_year || currentYear)
                      )}
                    </select>
                  </div>
                </div>
                {/* Worked till */}
                {!formData.currentlyWorking && (
                  <>
                    <div className="mb-3 form-group">
                      <label className="form-label">Leaving Date</label>

                      <div className="d-flex gap-3">
                        {/* Years Dropdown (2000 - 2025) */}
                        <select
                          className="form-select"
                          value={formData.leaving_year || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              leaving_year: e.target.value,
                              leaving_month: "", // reset month on year change
                            })
                          }
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 30 }, (_, i) => {
                            const year = currentYear - i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {/* Months Dropdown (Jan - Dec) */}
                        <select
                          className="form-select"
                          value={formData.leaving_month || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              leaving_month: e.target.value,
                            })
                          }
                        >
                          <option value="">Select month</option>
                          {generateMonthOptions(
                            parseInt(formData.leaving_year || currentYear)
                          )}
                        </select>
                      </div>
                    </div>

                    {error && <div className="text-danger mb-3">{error}</div>}
                  </>
                )}
                {/* Job profile */}
                <div className="mb-3 form-group">
                  <label className="form-label">
                    <b>Job profile</b>
                  </label>
                  <textarea
                    className="form-control mb-2"
                    placeholder="Type here ..."
                    rows="2" // default height = 1 row
                    name="description"
                    style={{
                      padding: "10px",
                      minheight: "2.5em",
                      height: "auto",
                      resize: "vertical", // allow only vertical resizing
                      minHeight: "2.5em", // ensures 1 row minimum height (adjust as needed)
                    }}
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      });
                      setIsGenerated(false); // Reset when user types
                    }}
                  />
                  <button
                    type="button"
                    className="suggestion-btn"
                    onClick={handleGenerateHeadline}
                  >
                    <Sparkles />
                    {isGenerated ? "Clear" : "Help me write"}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmploymentModal;
