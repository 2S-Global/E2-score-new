import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { it } from "date-fns/locale";
const getComparableDateValue = (year, month) => {
  if (!year || !month) return null;
  return parseInt(year) * 100 + parseInt(month); // e.g., 202405
};

const WorksampleModal = ({
  show,
  onClose,
  item,
  setReload,
  setSuccess,
  setmainError,
}) => {
  if (!show) return null;
  const [error, setError] = useState("");
  const [wrongDate, setWrongDate] = useState(false);
  const [description, setDescription] = useState("");
  const [isGenerated, setIsGenerated] = useState(false); // Track button presses
  const token = localStorage.getItem("candidate_token");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

  const [formData, setFormData] = useState({
    _id: item._id || "",
    workTitle: item.workTitle || "",
    url: item.url || "",
    description: item.description || "",
    durationFromYear: item.durationFrom?.year || "",
    durationFromMonth: item.durationFrom?.month || "",
    durationToYear: item.durationTo?.year || "",
    durationToMonth: item.durationTo?.month || "",
    currentlyWorking: item.currentlyWorking || false,
  });

  // Validation logic
  useEffect(() => {
    const startValue = getComparableDateValue(
      formData.durationFromYear,
      formData.durationFromMonth
    );
    const endValue = getComparableDateValue(
      formData.durationToYear,
      formData.durationToMonth
    );

    if (startValue && endValue) {
      if (startValue > endValue) {
        setError("Break start date cannot be after break end date.");
        setWrongDate(true);
      } else {
        setError("");
        setWrongDate(false);
      }
    }
  }, [
    formData.durationFromYear,
    formData.durationFromMonth,
    formData.durationToYear,
    formData.durationToMonth,
    formData.currentlyWorking,
  ]);

  useEffect(() => {
    if (formData.currentlyWorking) {
      setError("");
    }
  }, [formData.currentlyWorking]);

  const [urlError, setUrlError] = useState("");

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

  const validateURL = (url) => {
    try {
      const pattern = new URL(url); // Will throw if invalid
      return true;
    } catch {
      return false;
    }
  };

  const handleBlur = () => {
    if (!validateURL(formData.url)) {
      setUrlError("Please enter a valid URL (include https://)");
    } else {
      setUrlError("");
    }
  };

  const generateMonthOptions = (selectedYear) => {
    const maxMonth = selectedYear === currentYear ? currentMonth : 12;
    return monthNames.slice(0, maxMonth).map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [saving, setSaving] = useState(false);

  const validateForm = () => {
    if (!formData.workTitle || formData.workTitle.toString().trim() === "") {
      return false;
    }
    if (!formData.url || formData.url.toString().trim() === "") {
      return false;
    }
    if (formData.url && !validateURL(formData.url)) {
      return false;
    }

    return true;
  };
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleGenerateHeadline = () => {
    if (isGenerated) {
      setDescription(""); // Clear text if pressed again
      setIsGenerated(false);
    } else {
      setDescription(
        "Developed and deployed a scalable web application using React.js and Node.js, ensuring high performance and seamless user experience. Designed and implemented RESTful APIs, optimized database queries, and integrated third-party services for enhanced functionality. Focused on system architecture, security, and responsive UI/UX to deliver a robust and efficient solution."
      );
      setIsGenerated(true);
    }
  };

  const handleSave = async () => {
    if (!token) {
      console.error("Authorization token is missing. Please log in.");
      return;
    }
    console.log("Saving personal details:", formData);
    setSaving(true);
    /* api/candidate/accomplishments/add_work_samples*/
    try {
      if (formData._id) {
        const response = await axios.put(
          `${apiurl}/api/candidate/accomplishments/edit_online_profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setSaving(false);
          onClose();
          setReload(true);
          setSuccess(response.data.message);
        } else {
          console.error(
            "Error saving personal details:",
            response.data.message
          );
          setSaving(false);
          setmainError(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${apiurl}/api/candidate/accomplishments/add_work_samples`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setSaving(false);
          onClose();
          setReload(true);
          setSuccess(response.data.message);
        } else {
          console.error(
            "Error saving personal details:",
            response.data.message
          );
          setSaving(false);
          setmainError(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error saving personal details:", error);
      setSaving(false);
    }
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
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Work samples</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <form className="default-form">
              <div className="modal-body">
                <p style={{ color: "black" }}>
                  Link relevant work samples (e.g. Github, Behance)
                </p>

                {/* Social profile */}
                <div className="mb-3 form-group">
                  <label className="form-label">
                    <b>Work title</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Work title"
                    name="workTitle"
                    value={formData.workTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, workTitle: e.target.value })
                    }
                  />
                </div>
                {/* URL */}
                <div className="mb-3 form-group">
                  <label className="form-label">
                    <b>URL</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${urlError ? "is-invalid" : ""}`}
                    placeholder="Enter Your Social profile URL"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    onBlur={handleBlur}
                    required
                  />
                  {urlError && (
                    <div className="invalid-feedback">{urlError}</div>
                  )}
                </div>

                {/* Duration From */}
                <div className="mb-3 row form-group">
                  <label className="form-label">
                    <b>Duration From</b>
                  </label>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={formData.durationFromYear || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationFromYear: e.target.value,
                          durationFromMonth: "", // reset month on year change
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
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={formData.durationFromMonth || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationFromMonth: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Month</option>
                      {generateMonthOptions(
                        parseInt(formData.durationFromYear)
                      )}
                    </select>
                  </div>
                </div>

                {/* Duration To */}
                {!formData.currentlyWorking && (
                  <>
                    <div className="mb-3 row form-group">
                      <label className="form-label">
                        <b>Duration To</b>
                      </label>
                      <div className="col-md-6">
                        <select
                          className="form-select"
                          value={formData.durationToYear || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              durationToYear: e.target.value,
                              durationToMonth: "", // reset month on year change
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
                      </div>
                      <div className="col-md-6">
                        <select
                          className="form-select"
                          value={formData.durationToMonth || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              durationToMonth: e.target.value,
                            })
                          }
                        >
                          <option value="">Select month</option>
                          {generateMonthOptions(
                            parseInt(formData.durationToYear)
                          )}
                        </select>
                      </div>
                    </div>
                  </>
                )}
                {error && <div className="text-danger mb-3">{error}</div>}
                {/* Checkbox */}
                <div className="mb-3 form-group">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="currentlyWorking"
                      checked={formData.currentlyWorking}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentlyWorking: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="currentlyWorking"
                      className="form-label ms-2"
                    >
                      I am currently working on this
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3 form-group">
                  <label className="form-label">
                    <b>Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Type here ..."
                    rows="1" // default height = 1 row
                    name="description"
                    style={{
                      padding: "10px",
                      minheight: "2.5em",
                      resize: "vertical", // allow only vertical resizing
                      minHeight: "2.5em", // ensures 1 row minimum height (adjust as needed)
                    }}
                    value={formData.description || description}
                    onChange={(e) => {
                      setDescription(e.target.value);
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
              </div>
            </form>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <style jsx>{`
                .tooltip-wrapper {
                  position: relative;
                  display: inline-block;
                }

                .tooltip-wrapper .custom-tooltip {
                  visibility: hidden;
                  background-color: white;
                  color: red;
                  font-weight: bold;
                  text-align: center;
                  border: 1px solid red;
                  border-radius: 4px;
                  padding: 5px 10px;
                  position: absolute;
                  bottom: 100%;
                  left: 0;
                  margin-bottom: 6px;
                  z-index: 1;
                  white-space: nowrap;
                }

                .tooltip-wrapper:hover .custom-tooltip {
                  visibility: visible;
                }
              `}</style>

              <div className="tooltip-wrapper">
                {!isFormValid && (
                  <div className="custom-tooltip">
                    Please fill all required fields
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!isFormValid || saving}
                >
                  {item._id ? (
                    <>{saving ? "Updating..." : "Update"}</>
                  ) : (
                    <>{saving ? "Saving..." : "Save"}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksampleModal;
