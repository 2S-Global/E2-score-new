import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";

const CareerBreak = ({ formData, setFormData, apiurl }) => {
  const [careerBreakOptions, setCareerBreakOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* /api/sql/dropdown/career_break_reason */
    const fetchCareerBreakOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/career_break_reason`
        );
        setCareerBreakOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching career break options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCareerBreakOptions();
  }, [apiurl]);

  return (
    <>
      {loading ? (
        <CustomizedProgressBars />
      ) : (
        <>
          {" "}
          <div className="mb-3 form-group">
            <label className="form-label">
              <b>Reason of break</b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="d-flex gap-2 flex-wrap">
              {careerBreakOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={(e) =>
                    setFormData({
                      ...formData,
                      career_break_reason: option.id,
                    })
                  }
                  className={`btn option-btn rounded-pill ${
                    formData.career_break_reason == option.id ? "active" : ""
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
          {/* break start from */}
          <div className="mb-3 form-group row">
            <label className="form-label">
              <b>Break started from</b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="col-md-6">
              <select
                className="form-select"
                value={formData.career_break_start_year || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    career_break_start_year: e.target.value,
                  })
                }
              >
                <option value="">Select Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
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
                value={formData.career_break_start_month || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    career_break_start_month: e.target.value,
                  })
                }
              >
                <option value="">Select Month</option>
                {[
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
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!formData.currently_on_career_break && (
            <>
              <div className="mb-3 form-group row">
                <label className="form-label">
                  <b>Break ended in</b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={formData.career_break_end_year || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        career_break_end_year: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
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
                    value={formData.career_break_end_month || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        career_break_end_month: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Month</option>
                    {[
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
                    ].map((month, index) => (
                      <option key={index + 1} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          {formData.currently_on_career_break && (
            <>
              <div className="form-group mb-3 col-md-3">
                <label className="form-label">
                  <b>To</b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={"Present"}
                  placeholder="If currently on break, leave this empty"
                  readOnly
                />
              </div>
            </>
          )}
          {/* Currently on career break */}
          <div className="mb-3 form-group">
            <input
              type="checkbox"
              checked={formData.currently_on_career_break}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currently_on_career_break: e.target.checked,
                })
              }
            />
            <label className="form-label ms-2">Currently on a break</label>
            <div></div>
          </div>
          {formData.currently_on_career_break && (
            <div className="alert alert-warning">
              <strong>Note:</strong> If you are currently on a break, please
              ensure to update your profile when you return to work.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CareerBreak;
