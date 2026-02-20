"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { style } from "@mui/system";
import MessageComponent from "@/components/common/ResponseMsg";
import { useRef } from "react";

const JobListingsTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  const [loadingRow, setLoadingRow] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [availableDate, setAvailableDate] = useState("");
  const [availableStartTime, setAvailableStartTime] = useState("");
  const [availableEndTime, setAvailableEndTime] = useState("");

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
const dateRef = useRef(null);
const startTimeRef = useRef(null);
const endTimeRef = useRef(null);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";

    const { structure, currency, min, max, amount, rate } = salary;

    if (structure === "range" && min && max) {
      return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()} ${rate}`;
    }

    if (structure === "starting amount" && amount) {
      return `${currency}${amount.toLocaleString()} ${rate}`;
    }

    return "Not disclosed";
  };
  const formatStatus = (status) => {
    switch (status) {
      case "invitation_sent":
        return "Invitation Sent";
      case "offer_sent":
        return "Offer Sent";
      case "applied":
        return "Applied";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/jobposting/get_all_my_applied_job`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setAppliedJobs(response.data.data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppliedJobs();
    }
  }, [token]);

  const handleResponse = async (applicationId, jobId, accept) => {
    try {
      setError("");
      setSuccess("");

      setLoadingRow(applicationId);
      setLoadingType(accept ? "accept" : "reject");

      const res = await axios.post(
        `${apiurl}/api/jobposting/accept_interview_invitation`,
        {
          applicationId,
          jobId,
          accept,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data?.success) {
        setSuccess(res.data.message || "Response submitted successfully.");
        await fetchAppliedJobs();
      } else {
        setError(res.data?.message || "Something went wrong.");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Server not responding. Please try again.",
      );
    } finally {
      setLoadingRow(null);
      setLoadingType(null);
    }
  };

  const handleReschedule = (item) => {
    setSelectedRow(item);
    setAvailableDate("");
    setAvailableStartTime("");
    setAvailableEndTime("");
    setFieldErrors({});
    setShowModal(true);
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   let errors = {};

   if (!availableDate) errors.availableDate = "Date is required";
   if (!availableStartTime) errors.availableStartTime = "Start time required";
   if (!availableEndTime) errors.availableEndTime = "End time required";

   // 🔥 Time validation
   if (
     availableStartTime &&
     availableEndTime &&
     availableEndTime <= availableStartTime
   ) {
     errors.availableEndTime = "End time must be after start time";
   }

   if (Object.keys(errors).length > 0) {
     setFieldErrors(errors);
     return;
   }

   try {
     setSubmitLoading(true);

     const res = await axios.post(
       `${apiurl}/api/jobposting/request_reschedule_by_candidate`,
       {
         applicationId: selectedRow._id,
         requestDate: availableDate,
         requestStartTime: availableStartTime,
         requestEndTime: availableEndTime,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       },
     );

    if (res.data?.success) {

        setSuccess(""); 
    setTimeout(() => {
      setSuccess(res.data.message || "Success");
    }, 10);

      setError(null);
      setShowModal(false);
      await fetchAppliedJobs();
    } else {
      setError({
        message: res.data?.message || "Something went wrong.",
        time: Date.now(),
      });

      setSuccess(null);
    }
   } catch (err) {
     setError(err?.response?.data?.message || "Server error. Try again.");
   } finally {
     setSubmitLoading(false);
   }
 };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <style jsx>{`
        .icon-action {
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .icon-action:hover {
          background-color: rgba(0, 0, 0, 0.06); /* Very Light Black */
        }

        .icon-action:focus {
          outline: none;
          box-shadow: none;
        }
        .icon-action:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #ccc;
          border-top: 2px solid #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .custom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease-in-out;
          z-index: 9999;
        }

        .custom-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          padding: 20px;
          animation: scaleIn 0.2s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .custom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease-in-out;
          z-index: 9999;
        }

        .custom-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          padding: 20px;
          animation: scaleIn 0.2s ease-in-out;
        }

        .custom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 22px;
          font-weight: bold;
          cursor: pointer;
          color: #666;
          transition: 0.2s ease;
        }

        .close-btn:hover {
          color: #000;
          transform: scale(1.1);
        }

        .custom-modal-body {
          margin-bottom: 15px;
        }

        .custom-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .manage-job-table .applied {
          text-decoration: none !important;
        }
        .scheduled-box {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 4px solid #0d6efd;
        }
      `}</style>
      <div className="tabs-box">
        <div className="widget-title">
          <h4>My Applied Jobs</h4>
        </div>

        <div className="widget-content">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  {/* <th>Date Applied</th> */}
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appliedJobs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No applied jobs found
                    </td>
                  </tr>
                )}

                {appliedJobs.map((item) => {
                  const isInvitation = item.status === "invitation_sent";
                  const isAlreadyAccepted = Boolean(
                    item.interviewInvitationAccepted,
                  );
                  const shouldDisable =
                    loadingRow === item._id ||
                    item.status !== "invitation_sent" ||
                    typeof item.interviewInvitationAccepted === "boolean";

                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="job-block">
                          <div className="inner-box">
                            <h4 style={{ fontSize: "16px" }}>
                              <Link
                                href={`/job-details/${item.jobId?._id}`}
                                target="_blank"
                              >
                                {item.jobId.jobTitle}
                              </Link>
                            </h4>

                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-money"></span>
                                {formatSalary(item.jobId.salary)}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                <span style={{ textTransform: "capitalize" }}>
                                  {item.jobId.jobLocationType}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>

                      <td className={`status ${item.status}`}>
                        <span
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }}
                        >
                          {formatStatus(item.status)}
                        </span>
                      </td>

                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            {/* View */}
                            <li>
                              <Link
                                href={`/job-details/${item.jobId._id}?view=candidate`}
                                target="_blank"
                                className="icon-action"
                                data-text="View Application"
                              >
                                <span className="la la-eye"></span>
                              </Link>
                            </li>

                            {/* Accept */}
                            <li>
                              <button
                                type="button"
                                disabled={shouldDisable}
                                onClick={() =>
                                  handleResponse(item._id, item.jobId._id, true)
                                }
                                data-text="Accept Interview"
                                className="icon-action"
                              >
                                {loadingRow === item._id &&
                                loadingType === "accept" ? (
                                  <span className="spinner"></span>
                                ) : (
                                  <span className="la la-check text-success"></span>
                                )}
                              </button>
                            </li>

                            {/* Reject */}
                            <li>
                              <button
                                type="button"
                                disabled={shouldDisable}
                                onClick={() =>
                                  handleResponse(
                                    item._id,
                                    item.jobId._id,
                                    false,
                                  )
                                }
                                data-text="Reject Interview"
                                className="icon-action"
                              >
                                {loadingRow === item._id &&
                                loadingType === "reject" ? (
                                  <span className="spinner"></span>
                                ) : (
                                  <span className="la la-times text-danger"></span>
                                )}
                              </button>
                            </li>

                            {/* Reschedule */}
                            <li>
                              <button
                                type="button"
                                disabled={shouldDisable}
                                onClick={() => handleReschedule(item)}
                                className="icon-action"
                                data-text="Reschedule Interview"
                              >
                                <span className="la la-calendar text-warning"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="custom-overlay" onClick={() => setShowModal(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="custom-modal-header">
                <h5>Send Interview Reschedule Request</h5>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="custom-modal-body">
                {/* Date */}
                <div className="mb-3 mt-4">
                  {selectedRow?.interviewDate && (
                    <div className="scheduled-box">
                      <p className="mb-1">
                        <strong>Scheduled Interview Date:</strong>{" "}
                        {new Date(selectedRow.interviewDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>

                      <p>
                        <strong>Scheduled Interview Time:</strong>{" "}
                        {new Date(
                          `1970-01-01T${selectedRow.interviewTime}:00`,
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  )}

                  <label>Available Date</label>
                  <input
                    type="date"
                    className="form-control"
                    ref={dateRef}
                    min={new Date().toISOString().split("T")[0]}
                    value={availableDate}
                    onClick={() => dateRef.current?.showPicker()}
                    onChange={(e) => {
                      setAvailableDate(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        availableDate: "",
                      }));
                    }}
                  />
                  {fieldErrors.availableDate && (
                    <small className="text-danger">
                      {fieldErrors.availableDate}
                    </small>
                  )}
                </div>

                {/* Start Time */}
                <div className="mb-3">
                  <label>Available Start Time</label>
                  <input
                    type="time"
                    ref={startTimeRef}
                    className="form-control"
                    value={availableStartTime}
                    onClick={() => startTimeRef.current?.showPicker()}
                    onChange={(e) => {
                      setAvailableStartTime(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        availableStartTime: "",
                      }));
                    }}
                  />
                  {fieldErrors.availableStartTime && (
                    <small className="text-danger">
                      {fieldErrors.availableStartTime}
                    </small>
                  )}
                </div>

                {/* End Time */}
                <div className="mb-3">
                  <label>Available End Time</label>
                  <input
                    type="time"
                    ref={endTimeRef}
                    className="form-control"
                    value={availableEndTime}
                    onClick={() => endTimeRef.current?.showPicker()}
                    onChange={(e) => {
                      setAvailableEndTime(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        availableEndTime: "",
                      }));
                    }}
                  />
                  {fieldErrors.availableEndTime && (
                    <small className="text-danger">
                      {fieldErrors.availableEndTime}
                    </small>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    "Reschedule Request"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobListingsTable;
