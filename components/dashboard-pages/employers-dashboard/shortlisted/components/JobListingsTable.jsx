"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Applicants.module.css";
import MessageComponent from "@/components/common/ResponseMsg";
import { useRef } from "react";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";


export default function ShortlistedCandidatesPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const isActive = (path) => pathname === path;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // modal form fields
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [formDesignation, setFormDesignation] = useState("");

  // loaders
  const [submitLoading, setSubmitLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const [fieldErrors, setFieldErrors] = useState({
    interviewDate: "",
    interviewTime: "",
    formDesignation: "",
  });

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const capitalize = (value) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A";
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= FETCH SHORTLISTED CANDIDATES ================= */
  useEffect(() => {
    fetchShortlistedCandidates();
  }, [jobId, token]);

  const fetchShortlistedCandidates = async () => {
    if (!jobId || !token) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/get_all_job_related_shortlisted_candidates?jobId=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();
      setCandidates(result?.data || []);
    } catch (error) {
      console.error("Error fetching shortlisted candidates", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= MODAL HANDLERS ================= */
  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setFormDesignation(candidate.jobRole);
    setInterviewDate("");
    setInterviewTime("");
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);

    setInterviewDate("");
    setInterviewTime("");
    setFormDesignation("");

    setFieldErrors({
      interviewDate: "",
      interviewTime: "",
      formDesignation: "",
    });

    setError("");
    setSubmitLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {
      interviewDate: "",
      interviewTime: "",
      formDesignation: "",
    };

    if (!interviewDate) {
      errors.interviewDate = "Interview date is required";
    }

    if (!interviewTime) {
      errors.interviewTime = "Interview time is required";
    }

    // if (!formDesignation) {
    //   errors.formDesignation = "Designation is required";
    // }

    setFieldErrors(errors);

    // ❌ stop if any error exists
    if (
      errors.interviewDate ||
      errors.interviewTime ||
      errors.formDesignation
    ) {
      return;
    }

    // ---- API CALL ----
    setSubmitLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/accept_shortlisted_candidates`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: selectedCandidate._id,
            interviewDate,
            interviewTime,
            formDesignation,
          }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(result.message || "Invitation sent successfully");
        closeModal();
        fetchShortlistedCandidates();
      } else {
        setError(result?.message || "Failed to send invitation");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReject = async (applicationId) => {
    setActionLoading(applicationId);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/reject_job_application_status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ applicationId }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(result.message || "Candidate rejected");
        fetchShortlistedCandidates();
      } else {
        setError(result?.message || "Reject failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setActionLoading(null);
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
      <div className={styles.tabsBox}>
        {/* ================= HEADER ================= */}
        <div
          className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
        >
          <div className={styles.topLinks}>
            <Link
              href={`/employers-dashboard/job-applicants?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/job-applicants") ? styles.active : ""}`}
            >
              <i className="la la-users"></i> Applicants
            </Link>
            <Link
              href={`/employers-dashboard/shortlisted?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/shortlisted") ? styles.active : ""}`}
            >
              <i className="la la-user-check"></i> Shortlisted Candidates
            </Link>
            <Link
              href={`/employers-dashboard/invitation?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/invitation") ? styles.active : ""}`}
            >
              <i className="la la-paper-plane"></i> Interview Letter
            </Link>
            <Link
              href={`/employers-dashboard/offer-letter?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/offer-letter") ? styles.active : ""}`}
            >
              <i className="la la-envelope"></i> Offer Letter Sent
            </Link>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="table-responsive">
          <table className={`table table-hover align-middle ${styles.table}`}>
            <thead>
              <tr>
                <th className="text-center">Candidate</th>
                <th>Job Role</th>
                <th>Current Location</th>
                {/* <th>Expected Salary</th> */}
                <th>Experience / Notice</th>
                <th>Details</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADER */}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border text-primary" />
                    <div className="mt-2">
                      Loading shortlisted candidates...
                    </div>
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && candidates.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No shortlisted candidates found
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                candidates.map((candidate) => (
                  <tr key={candidate.userId}>
                    <td>
                      <div className="d-flex flex-column align-items-center text-center gap-1">
                        <div className={styles.candidateAvatar}>
                          <Image
                            src={
                              candidate.profilePicture ||
                              "/images/default-avatar.png"
                            }
                            alt={candidate.candidateName}
                            fill
                            sizes="50px"
                            className={styles.avatarImg}
                          />
                        </div>
                        <span className={styles.candidateName}>
                          {candidate.candidateName}
                        </span>
                      </div>
                    </td>

                    <td>{candidate.jobRole}</td>

                    <td>
                      <i className="la la-map-marker me-1"></i>
                      {candidate.currentLocation}
                    </td>

                    {/* <td>
                      ₹{candidate.expectedSalary?.salary}{" "}
                      {candidate.expectedSalary?.currency}
                    </td> */}

                    <td>
                      {candidate.experienceLevel} Years /{" "}
                      {candidate.noticePeriod}
                    </td>
                    <td className={styles.detailsCell}>
                      <ul
                        className={`list-unstyled mb-0 small ${styles.detailsList}`}
                      >
                        <li style={{ textAlign: "left" }}>
                          <strong>Preferred Time:</strong>{" "}
                          {capitalize(candidate.preferredTime)}
                        </li>
                        <li style={{ textAlign: "left" }}>
                          <strong>Saturday Available:</strong>{" "}
                          {capitalize(candidate.availabilityOnSaturday)}
                        </li>
                        <li style={{ textAlign: "left" }}>
                          <strong>Relocate:</strong>{" "}
                          {capitalize(candidate.willingToRelocate)}
                        </li>
                      </ul>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          href={`/candidates-details/${candidate.userId}`}
                          className="btn btn-outline-primary btn-sm"
                          title="View Candidate Details"
                          target="_blank"
                        >
                          <i className="la la-eye"></i>
                        </Link>

                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => openModal(candidate)}
                          title="Send Interview Invitation"
                        >
                          <i className="la la-paper-plane"></i>
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          disabled={actionLoading === candidate._id}
                          onClick={() => {
                            setSelectedApplicationId(candidate._id);
                            setShowRejectModal(true);
                          }}
                          title="Remove from Shortlist"
                        >
                          {actionLoading === candidate._id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            <i className="la la-times"></i>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ================= INVITATION MODAL ================= */}
        {showModal && (
          <>
            <div
              className="modal show d-block"
              tabIndex="-1"
              onClick={closeModal}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Send Interview Invitation</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      />
                    </div>

                    <div className="modal-body">
                      <p>
                        <strong>Candidate:</strong>{" "}
                        {selectedCandidate?.candidateName}
                      </p>

                      <p className="mb-4 mt-2">
                        <strong>Designation For:</strong>{" "}
                        {selectedCandidate?.jobRole}
                      </p>

                      <div className="mb-3">
                        <label className="form-label">Interview Date</label>
                        <input
                          ref={dateRef}
                          type="date"
                          className="form-control"
                          value={interviewDate}
                          onClick={() => dateRef.current?.showPicker()}
                          onChange={(e) => {
                            setInterviewDate(e.target.value);
                            setFieldErrors((prev) => ({
                              ...prev,
                              interviewDate: "",
                            }));
                          }}
                        />

                        {fieldErrors.interviewDate && (
                          <small className="text-danger">
                            {fieldErrors.interviewDate}
                          </small>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Interview Time</label>
                        <input
                          ref={timeRef}
                          type="time"
                          className="form-control"
                          value={interviewTime}
                          onClick={() => timeRef.current?.showPicker()}
                          onChange={(e) => {
                            setInterviewTime(e.target.value);
                            setFieldErrors((prev) => ({
                              ...prev,
                              interviewTime: "",
                            }));
                          }}
                        />
                        {fieldErrors.interviewTime && (
                          <small className="text-danger">
                            {fieldErrors.interviewTime}
                          </small>
                        )}
                      </div>

                      {/* <div className="mb-3">
                        <label className="form-label">Designation For</label>
                        <input
                          type="hidden"
                          className="form-control"
                          value={formDesignation}
                          readOnly
                        />

                        {fieldErrors.formDesignation && (
                          <small className="text-danger">
                            {fieldErrors.formDesignation}
                          </small>
                        )}
                      </div> */}
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
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
                          "Send Invitation"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal-backdrop show" />
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedApplicationId(null);
        }}
        title="Remove from Shortlist"
        message="Are you sure you want to remove this candidate from shortlist?"
        confirmText="Yes, Remove"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          if (selectedApplicationId) {
            await handleReject(selectedApplicationId);
          }
          setShowRejectModal(false);
          setSelectedApplicationId(null);
        }}
      />
    </>
  );
}
