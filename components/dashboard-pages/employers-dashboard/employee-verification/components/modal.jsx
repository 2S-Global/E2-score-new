import React, { useState } from "react";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [user] = useState({
    designation: "Software Engineer",
    employmenttype: "Full-time",
    currentlyemployed: false,
    joiningdate: "2020-01-01",
    leavedate: "2021-01-01",
    Verified: false,
    designation_verified: false,
    duration_verified: false,
    Serverd_notice_period: false,
    has_noc: false,
    has_due: false,
  });

  const [formdata, setFormData] = useState({
    ...user,
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (field) => () =>
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Form submitted successfully!");
    }, 1500);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ maxHeight: "90vh" }}
      >
        <div
          className="modal-content"
          style={{ borderRadius: "8px", overflow: "hidden" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Employee Verification</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div
            className="modal-body p-3"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            {loading ? (
              <CustomizedProgressBars />
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Profile Summary Card */}
                <div
                  className="card border shadow-sm mb-4"
                  style={{ width: "100%", margin: "0 auto", height: "auto" }}
                >
                  <div className="card-body p-3">
                    <h5 className="card-title mb-3">Employee Information</h5>
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <strong>Designation:</strong> {user.designation}
                      </div>
                      <div className="col-sm-6">
                        <strong>Employment Type:</strong> {user.employmenttype}
                      </div>
                      <div className="col-sm-6">
                        <strong>Joining Date:</strong> {user.joiningdate}
                      </div>
                      <div className="col-sm-6">
                        <strong>Leave Date:</strong> {user.leavedate}
                      </div>
                      <div className="col-sm-6">
                        <strong>Currently Employed:</strong>{" "}
                        {user.currentlyemployed ? (
                          <span className="badge bg-success">Yes</span>
                        ) : (
                          <span className="badge bg-secondary">No</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editable Form Fields */}
                <div className="row g-3">
                  {/* Designation */}
                  <div className="col-md-6">
                    <label className="form-label">
                      <b>Designation</b>
                    </label>
                    {user.designation_verified ? (
                      <p className="form-control-plaintext">
                        {user.designation}
                      </p>
                    ) : (
                      <input
                        name="designation"
                        type="text"
                        className="form-control"
                        value={formdata.designation}
                        onChange={handleChange}
                      />
                    )}
                  </div>

                  {/* Employment Type */}
                  <div className="col-md-6">
                    <label className="form-label">
                      <b>Employment Type</b>
                    </label>
                    <input
                      name="employmenttype"
                      type="text"
                      className="form-control"
                      value={formdata.employmenttype}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Joining Date */}
                  <div className="col-md-6">
                    <label className="form-label">
                      <b>Joining Date</b>
                    </label>
                    <input
                      name="joiningdate"
                      type="date"
                      className="form-control"
                      value={formdata.joiningdate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Leave Date */}
                  <div className="col-md-6">
                    <label className="form-label">
                      <b>Leave Date</b>
                    </label>
                    <input
                      name="leavedate"
                      type="date"
                      className="form-control"
                      value={formdata.leavedate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Switches */}
                  <div className="col-12 mt-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="verifiedSwitch"
                        checked={formdata.Verified}
                        onChange={handleToggle("Verified")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="verifiedSwitch"
                      >
                        Verified
                      </label>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="designationSwitch"
                        checked={formdata.designation_verified}
                        onChange={handleToggle("designation_verified")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="designationSwitch"
                      >
                        Designation Verified
                      </label>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="durationSwitch"
                        checked={formdata.duration_verified}
                        onChange={handleToggle("duration_verified")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="durationSwitch"
                      >
                        Duration Verified
                      </label>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="col-md-4 mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="noticePeriod"
                        name="Serverd_notice_period"
                        checked={formdata.Serverd_notice_period}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noticePeriod"
                      >
                        Served Notice Period
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="hasNoc"
                        name="has_noc"
                        checked={formdata.has_noc}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="hasNoc">
                        Has NOC
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="hasDue"
                        name="has_due"
                        checked={formdata.has_due}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="hasDue">
                        Has Dues
                      </label>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="col-12 mt-4">
                    <label className="form-label">
                      <b>Remarks</b>
                    </label>
                    <textarea
                      className="form-control"
                      name="remarks"
                      rows="4"
                      style={{
                        resize: "vertical",
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                      value={formdata.remarks}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
