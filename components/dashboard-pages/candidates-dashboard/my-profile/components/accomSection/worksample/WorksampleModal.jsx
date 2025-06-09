import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";
const getComparableDateValue = (year, month) => {
  if (!year || !month) return null;
  return parseInt(year) * 100 + parseInt(month); // e.g., 202405
};

const WorksampleModal = ({ show, onClose }) => {
  if (!show) return null;
  const [error, setError] = useState("");
  const [wrongDate, setWrongDate] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

  const [formData, setFormData] = useState({
    _id: "",
    workTitle: "",
    url: "",
    description: "",
    durationFromYear: "",
    durationFromMonth: "",
    durationToYear: "",
    durationToMonth: "",
    currentlyWorking: false,
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

  return (
    <>
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
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
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
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksampleModal;
