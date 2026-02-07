"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Applicants.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import { useRef } from "react";

export default function InvitationPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const isActive = (path) => pathname === path;

  /* ================= STATES ================= */
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // offer form fields
  const [offerDesignation, setOfferDesignation] = useState("");
  const [offerJoiningDate, setOfferJoiningDate] = useState("");
  const [offerSalary, setOfferSalary] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  // loaders
  const [offerLoading, setOfferLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(null);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const [designationLoading, setDesignationLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    interviewDate: "",
    interviewTime: "",
  });
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  // field errors
  const [offerErrors, setOfferErrors] = useState({
    designation: "",
    joiningDate: "",
    salary: "",
    message: "",
  });

  const [communicationScore, setCommunicationScore] = useState("");
  const [technicalScore, setTechnicalScore] = useState("");
  const [aptitudeScore, setAptitudeScore] = useState("");
  const [overallScore, setOverallScore] = useState("");
  const [remarksMessage, setRemarksMessage] = useState("");
  const [lastDrawnSalary, setLastDrawnSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [candidateAppeared, setCandidateAppeared] = useState("");

  // loader
  const [remarksLoading, setRemarksLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // field errors

  const joiningDateRef = useRef(null);

  const [remarksErrors, setRemarksErrors] = useState({
    communication: "",
    technical: "",
    aptitude: "",
    overall: "",
    message: "",
    lastDrawnSalary: "",
    expectedSalary: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= API CALL ================= */

  const fetchInvitedCandidates = async () => {
    if (!jobId || !token) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/get_all_job_related_invitation_sent_candidates?jobId=${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      setCandidates(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId && token) {
      fetchInvitedCandidates();
    }
  }, [jobId, token]);

  const handleSendOffer = async () => {
    let errors = {
      designation: "",
      joiningDate: "",
      salary: "",
      message: "",
    };

    if (!offerDesignation) errors.designation = "Designation is required";
    if (!offerJoiningDate) errors.joiningDate = "Joining date is required";
    if (!offerSalary) errors.salary = "Salary is required";
    if (!offerMessage) errors.message = "Message is required";

    setOfferErrors(errors);

    if (Object.values(errors).some(Boolean)) return;

    setOfferLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/sent_offer_to_candidates`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: selectedCandidate._id,
            offer_letter_designation: offerDesignation,
            offer_letter_joining_date: offerJoiningDate,
            offer_letter_salary: offerSalary,
            offer_letter_message: offerMessage,
          }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(result.message || "Offer sent successfully");

        // 🔥 Optimistic UI
        setCandidates((prev) =>
          prev.filter((c) => c._id !== selectedCandidate._id),
        );

        setShowOfferModal(false);
        fetchInvitedCandidates();
      } else {
        setError(result?.message || "Failed to send offer");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setOfferLoading(false);
    }
  };

  const handleRejectCandidate = async (applicationId) => {
    setRejectLoading(applicationId);
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

        // ✅ Optimistic UI
        setCandidates((prev) => prev.filter((c) => c._id !== applicationId));

        // 🔁 Sync with backend
        fetchInvitedCandidates();
      } else {
        setError(result?.message || "Reject failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setRejectLoading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {
      interviewDate: "",
      interviewTime: "",
    };

    if (!interviewDate) {
      errors.interviewDate = "Interview date is required";
    }

    if (!interviewTime) {
      errors.interviewTime = "Interview time is required";
    }

    setFieldErrors(errors);

    if (errors.interviewDate || errors.interviewTime) return;

    setSubmitLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/accept_shortlisted_candidates_reschedule`,
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
            formDesignation: selectedCandidate.jobRole,
          }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess("Interview rescheduled successfully");
        closeModal();
        fetchInvitedCandidates();
      } else {
        setError(result?.message || "Reschedule failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);

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

    setFieldErrors({
      interviewDate: "",
      interviewTime: "",
      formDesignation: "",
    });

    setError("");
    setSubmitLoading(false);
  };

  /* ================= HANDLERS ================= */
  const openRemarksModal = (candidate) => {
    setSelectedCandidate(candidate);
    setCandidateAppeared("");
    setCommunicationScore("");
    setTechnicalScore("");
    setAptitudeScore("");
    setOverallScore("");
    setRemarksMessage("");
    setLastDrawnSalary("");
    setExpectedSalary("");
    setRemarksErrors({
      communication: "",
      technical: "",
      aptitude: "",
      overall: "",
      message: "",
      lastDrawnSalary: "",
      expectedSalary: "",
    });

    setError("");
    setSuccess("");
    setShowRemarksModal(true);
  };

  const handleSaveRemarks = async () => {
    // 1️⃣ Candidate appeared is mandatory
    if (!candidateAppeared) {
      setRemarksErrors((p) => ({
        ...p,
        appeared: "Please select whether candidate appeared",
      }));
      return;
    }

    // 2️⃣ If candidate did NOT appear → save minimal data
    if (candidateAppeared === "no") {
      setRemarksLoading(true);
      setError("");
      setSuccess("");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/save_interview_feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              applicationId: selectedCandidate._id,
              appeared: false,
            }),
          },
        );

        const result = await res.json();

        if (res.ok && result.success) {
          setSuccess("Candidate marked as not appeared");
          setShowRemarksModal(false);
          fetchInvitedCandidates();
        } else {
          setError(result?.message || "Failed to save feedback");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setRemarksLoading(false);
      }

      return; // ⛔ STOP HERE
    }

    // 3️⃣ Candidate appeared = YES → full validation
    let errors = {
      communication: "",
      technical: "",
      aptitude: "",
      overall: "",
      message: "",
      lastDrawnSalary: "",
      expectedSalary: "",
    };

    if (!communicationScore)
      errors.communication = "Communication score is required";
    else if (communicationScore < 1 || communicationScore > 10)
      errors.communication = "Score must be between 1 and 10";

    if (!technicalScore) errors.technical = "Technical skill score is required";
    else if (technicalScore < 1 || technicalScore > 10)
      errors.technical = "Score must be between 1 and 10";

    if (!aptitudeScore) errors.aptitude = "Aptitude score is required";
    else if (aptitudeScore < 1 || aptitudeScore > 10)
      errors.aptitude = "Score must be between 1 and 10";

    if (!overallScore) errors.overall = "Overall score is required";
    else if (overallScore < 1 || overallScore > 10)
      errors.overall = "Score must be between 1 and 10";

    if (!lastDrawnSalary)
      errors.lastDrawnSalary = "Last drawn salary is required";

    if (!expectedSalary) errors.expectedSalary = "Expected salary is required";

    if (!remarksMessage) errors.message = "Remarks message is required";

    setRemarksErrors(errors);

    if (Object.values(errors).some(Boolean)) return;

    // 4️⃣ Save full feedback
    setRemarksLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/save_interview_feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: selectedCandidate._id,
            appeared: true,
            communicationSkillScore: communicationScore,
            technicalSkillScore: technicalScore,
            aptitudeScore,
            overallScore,
            lastDrawnSalary,
            expectedSalary,
            message: remarksMessage,
          }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(result.message || "Interview feedback saved");
        setShowRemarksModal(false);
        fetchInvitedCandidates();
      } else {
        setError(result?.message || "Failed to save feedback");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setRemarksLoading(false);
    }
  };

  const openOfferModal = (candidate) => {
    setSelectedCandidate(candidate);

    setOfferDesignation("");
    setOfferJoiningDate("");
    setOfferSalary("");
    setOfferMessage("");

    setOfferErrors({
      designation: "",
      joiningDate: "",
      salary: "",
      message: "",
    });

    setError("");
    setSuccess("");
    setShowOfferModal(true);
  };

  const closeAllModals = () => {
    setShowRemarksModal(false);
    setShowOfferModal(false);
    setSelectedCandidate(null);
  };

  const fetchSpecialization = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/all_job_specializations?query=${inputValue}`,
      );

      const data = await response.json();
      const list = data.data || [];

      return list.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    } catch (error) {
      console.error("Error fetching specializations:", error);
      return [];
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
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/job-applicants")
                  ? styles.active
                  : ""
              }`}
            >
              <i className="la la-users"></i> Applicants
            </Link>

            <Link
              href={`/employers-dashboard/shortlisted?jobId=${jobId}`}
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/shortlisted")
                  ? styles.active
                  : ""
              }`}
            >
              <i className="la la-user-check"></i> Shortlisted Candidates
            </Link>

            <Link
              href={`/employers-dashboard/invitation?jobId=${jobId}`}
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/invitation") ? styles.active : ""
              }`}
            >
              <i className="la la-paper-plane"></i> Interview Letter
            </Link>
            <Link
              href={`/employers-dashboard/offer-letter?jobId=${jobId}`}
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/offer-letter")
                  ? styles.active
                  : ""
              }`}
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
                <th>Image</th>
                <th>Name</th>

                <th>Experience</th>
                <th>Notice Period</th>
                <th>Interview Date/Time</th>
                <th>Status</th>
                <th>Interview Feedback</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADER */}
              {loading && (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border text-primary" />
                    <div className="mt-2">Loading invitations...</div>
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && candidates.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No Interview letter sent candidates found
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                candidates.map((c) => (
                  <tr key={c.userId}>
                    <td className="text-center">
                      <div className={styles.candidateAvatar}>
                        <Image
                          src={c.profilePicture || "/images/default-avatar.png"}
                          alt={c.candidateName}
                          fill
                          sizes="50px"
                          className={styles.avatarImg}
                        />
                      </div>
                    </td>
                    <td className={styles.candidateName}>{c.candidateName}</td>
                    <td>{c.experienceLevel || "-"} Years</td>
                    <td>
                      {c.noticePeriod
                        ? c.noticePeriod.charAt(0).toUpperCase() +
                          c.noticePeriod.slice(1)
                        : "-"}
                    </td>
                    <td className="small">
                      {c.interviewDate && c.interviewTime ? (
                        <>
                          <div className="fw-semibold">
                            {new Date(c.interviewDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </div>
                          <div className="text-muted">
                            {new Date(
                              `1970-01-01T${c.interviewTime}`,
                            ).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </div>
                        </>
                      ) : (
                        <span className="text-muted fst-italic">
                          Not scheduled
                        </span>
                      )}
                    </td>

                    <td>
                      {c.interviewInvitationStatus ? (
                        <span
                          className={
                            c.interviewInvitationStatus === "pending"
                              ? "text-warning fw-semibold"
                              : c.interviewInvitationStatus === "accepted"
                                ? "text-success fw-semibold"
                                : c.interviewInvitationStatus === "rejected"
                                  ? "text-danger fw-semibold"
                                  : ""
                          }
                        >
                          {c.interviewInvitationStatus.charAt(0).toUpperCase() +
                            c.interviewInvitationStatus.slice(1)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className={styles.feedbackCell}>
                      {c.isInterviewFeedbackSubmitted && c.feedback ? (
                        <>
                          {/* ===== Desktop View ===== */}
                          <div className="row gx-1 d-none d-md-flex">
                            <div className="col-6">
                              <strong>Comm:</strong>{" "}
                              {c.feedback.communicationSkillScore}/10
                            </div>
                            <div className="col-6">
                              <strong>Tech:</strong>{" "}
                              {c.feedback.technicalSkillScore}/10
                            </div>

                            <div className="col-6">
                              <strong>Apt:</strong> {c.feedback.aptitudeScore}
                              /10
                            </div>
                            <div className="col-6">
                              <strong>Overall:</strong>{" "}
                              <span
                                className={`fw-bold ${
                                  c.feedback.overallScore >= 7
                                    ? "text-success"
                                    : c.feedback.overallScore >= 4
                                      ? "text-warning"
                                      : "text-danger"
                                }`}
                              >
                                {c.feedback.overallScore}/10
                              </span>
                            </div>

                            <div className="col-12 mt-1">
                              <strong>Message:</strong>{" "}
                              <span className="fst-italic text-muted">
                                “{c.feedback.message}”
                              </span>
                            </div>
                          </div>

                          {/* ===== Mobile View ===== */}
                          <div className="d-md-none">
                            <div>
                              <strong>Comm:</strong>{" "}
                              {c.feedback.communicationSkillScore}/10
                            </div>
                            <div>
                              <strong>Tech:</strong>{" "}
                              {c.feedback.technicalSkillScore}/10
                            </div>
                            <div>
                              <strong>Apt:</strong> {c.feedback.aptitudeScore}
                              /10
                            </div>
                            <div>
                              <strong>Overall:</strong>{" "}
                              <span
                                className={`fw-bold ${
                                  c.feedback.overallScore >= 7
                                    ? "text-success"
                                    : c.feedback.overallScore >= 4
                                      ? "text-warning"
                                      : "text-danger"
                                }`}
                              >
                                {c.feedback.overallScore}/10
                              </span>
                            </div>

                            <div className="mt-1 text-muted fst-italic">
                              “{c.feedback.message}”
                            </div>
                          </div>
                        </>
                      ) : (
                        <span className="text-muted fst-italic">
                          Feedback not submitted
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          href={`/candidates-details/${c.userId}`}
                          className="btn btn-outline-primary btn-sm"
                          title="View Candidate Details"
                          target="_blank"
                        >
                          <i className="la la-eye"></i>
                        </Link>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => openModal(c)}
                          title="Interview Reschedule"
                        >
                          <i className="la la-calendar-alt"></i>
                        </button>

                        <span
                          title={
                            c.isInterviewFeedbackSubmitted
                              ? "Feedback already submitted"
                              : "Add Remarks"
                          }
                          style={{ display: "inline-block" }}
                        >
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => openRemarksModal(c)}
                            disabled={c.isInterviewFeedbackSubmitted}
                            style={{
                              pointerEvents: c.isInterviewFeedbackSubmitted
                                ? "none"
                                : "auto",
                            }}
                          >
                            <i className="la la-comment"></i>
                          </button>
                        </span>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => openOfferModal(c)}
                          title="Send Offer Letter"
                        >
                          <i className="la la-envelope"></i>
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          disabled={rejectLoading === c._id}
                          onClick={() => {
                            const confirmReject = window.confirm(
                              "Are you sure you want to reject this candidate?",
                            );
                            if (confirmReject) {
                              handleRejectCandidate(c._id);
                            }
                          }}
                          title="Reject Candidate"
                        >
                          {rejectLoading === c._id ? (
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
      </div>

      {/* ================= REMARKS MODAL ================= */}
      {showRemarksModal && (
        <>
          <div
            className="modal show d-block"
            tabIndex="-1"
            onClick={closeAllModals}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Interview Remarks – {selectedCandidate?.candidateName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeAllModals}
                  />
                </div>

                {/* Candidate Appeared */}
                <div className="col-12 px-3">
                  <label className="form-label fw-semibold">
                    Candidate Appeared <span className="text-danger">*</span>
                  </label>

                  <div className="d-flex gap-4 mt-1 ">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="candidateAppeared"
                        id="appearedYes"
                        value="yes"
                        checked={candidateAppeared === "yes"}
                        onChange={() => setCandidateAppeared("yes")}
                      />
                      <label className="form-check-label" htmlFor="appearedYes">
                        Yes
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="candidateAppeared"
                        id="appearedNo"
                        value="no"
                        checked={candidateAppeared === "no"}
                        onChange={() => {
                          setCandidateAppeared("no");

                          // reset fields if No
                          setCommunicationScore("");
                          setTechnicalScore("");
                          setAptitudeScore("");
                          setOverallScore("");
                          setLastDrawnSalary("");
                          setExpectedSalary("");
                          setRemarksMessage("");
                        }}
                      />
                      <label className="form-check-label" htmlFor="appearedNo">
                        No
                      </label>
                    </div>
                  </div>

                  {remarksErrors.appeared && (
                    <small className="text-danger">
                      {remarksErrors.appeared}
                    </small>
                  )}
                </div>

                {candidateAppeared === "yes" && (
                  <>
                    <div className="modal-body">
                      <div className="row g-3">
                        {/* Communication */}
                        <div className="col-md-6">
                          <label className="form-label">Communication</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Score (1–10)"
                            value={communicationScore}
                            onChange={(e) => {
                              setCommunicationScore(e.target.value);
                              setRemarksErrors((p) => ({
                                ...p,
                                communication: "",
                              }));
                            }}
                          />
                          {remarksErrors.communication && (
                            <small className="text-danger">
                              {remarksErrors.communication}
                            </small>
                          )}
                        </div>

                        {/* Technical Skills */}
                        <div className="col-md-6">
                          <label className="form-label">Technical Skills</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Score (1–10)"
                            value={technicalScore}
                            onChange={(e) => {
                              setTechnicalScore(e.target.value);
                              setRemarksErrors((p) => ({
                                ...p,
                                technical: "",
                              }));
                            }}
                          />
                          {remarksErrors.technical && (
                            <small className="text-danger">
                              {remarksErrors.technical}
                            </small>
                          )}
                        </div>

                        {/* Aptitude */}
                        <div className="col-md-6">
                          <label className="form-label">Aptitude</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Score (1–10)"
                            value={aptitudeScore}
                            onChange={(e) => {
                              setAptitudeScore(e.target.value);
                              setRemarksErrors((p) => ({ ...p, aptitude: "" }));
                            }}
                          />
                          {remarksErrors.aptitude && (
                            <small className="text-danger">
                              {remarksErrors.aptitude}
                            </small>
                          )}
                        </div>

                        {/* Overall Score */}
                        <div className="col-md-6">
                          <label className="form-label">Overall Score</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Score (1–10)"
                            value={overallScore}
                            onChange={(e) => {
                              setOverallScore(e.target.value);
                              setRemarksErrors((p) => ({ ...p, overall: "" }));
                            }}
                          />
                          {remarksErrors.overall && (
                            <small className="text-danger">
                              {remarksErrors.overall}
                            </small>
                          )}
                        </div>

                        {/* Last Drawn Salary */}
                        <div className="col-md-6">
                          <label className="form-label">
                            Last Drawn Salary
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. ₹6,50,000 / year"
                            value={lastDrawnSalary}
                            onChange={(e) => {
                              setLastDrawnSalary(e.target.value);
                              setRemarksErrors((p) => ({
                                ...p,
                                lastDrawnSalary: "",
                              }));
                            }}
                          />
                          {remarksErrors.lastDrawnSalary && (
                            <small className="text-danger">
                              {remarksErrors.lastDrawnSalary}
                            </small>
                          )}
                        </div>

                        {/* Expected Salary */}
                        <div className="col-md-6">
                          <label className="form-label">Expected Salary</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. ₹8,00,000 / year"
                            value={expectedSalary}
                            onChange={(e) => {
                              setExpectedSalary(e.target.value);
                              setRemarksErrors((p) => ({
                                ...p,
                                expectedSalary: "",
                              }));
                            }}
                          />
                          {remarksErrors.expectedSalary && (
                            <small className="text-danger">
                              {remarksErrors.expectedSalary}
                            </small>
                          )}
                        </div>

                        {/* Message */}
                        <div className="col-12">
                          <label className="form-label">Message</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter remarks"
                            value={remarksMessage}
                            onChange={(e) => {
                              setRemarksMessage(e.target.value);
                              setRemarksErrors((p) => ({ ...p, message: "" }));
                            }}
                          />
                          {remarksErrors.message && (
                            <small className="text-danger">
                              {remarksErrors.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={closeAllModals}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary"
                    disabled={remarksLoading}
                    onClick={handleSaveRemarks}
                  >
                    {remarksLoading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Save Remarks"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show" />
        </>
      )}

      {/* ================= OFFER / ENVELOPE MODAL ================= */}
      {showOfferModal && (
        <>
          <div
            className="modal show d-block"
            tabIndex="-1"
            onClick={closeAllModals}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Offer Discussion – {selectedCandidate?.candidateName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeAllModals}
                  />
                </div>

                {/* ===== LAST WITHDRAWN & EXPECTED SALARY (READ ONLY) ===== */}
                <div className="col-12 px-3">
                  <p className="mb-1">
                    <strong>Last Withdrawn Salary:</strong>{" "}
                    {selectedCandidate?.feedback?.lastDrawnSalary || "N/A"}
                  </p>

                  <p className="mb-1">
                    <strong>Expected Salary:</strong>{" "}
                    {selectedCandidate?.feedback?.expectedSalary || "N/A"}
                  </p>
                  <p className="mb-0">
                    <strong>Notice Period:</strong>{" "}
                    {selectedCandidate?.noticePeriod
                      ? selectedCandidate.noticePeriod.charAt(0).toUpperCase() +
                        selectedCandidate.noticePeriod.slice(1)
                      : "N/A"}
                  </p>
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6 position-relative">
                      <label className="form-label">Designation</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Senior Developer"
                        value={offerDesignation}
                        onChange={async (e) => {
                          const value = e.target.value;
                          setOfferDesignation(value);
                          setOfferErrors((p) => ({ ...p, designation: "" }));

                          if (!value) {
                            setDesignationOptions([]);
                            setShowDesignationDropdown(false);
                            return;
                          }

                          setDesignationLoading(true);
                          const results = await fetchSpecialization(value);
                          setDesignationOptions(results);
                          setShowDesignationDropdown(true);
                          setDesignationLoading(false);
                        }}
                        onBlur={() =>
                          setTimeout(
                            () => setShowDesignationDropdown(false),
                            150,
                          )
                        }
                        onFocus={() => {
                          if (designationOptions.length > 0) {
                            setShowDesignationDropdown(true);
                          }
                        }}
                      />

                      {/* Dropdown */}
                      {showDesignationDropdown && (
                        <ul
                          className="list-group position-absolute w-100 shadow"
                          style={{
                            zIndex: 1000,
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          {designationOptions.map((item, index) => (
                            <li
                              key={index}
                              className="list-group-item list-group-item-action"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOfferDesignation(item.value);
                                setShowDesignationDropdown(false);
                              }}
                            >
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      )}

                      {offerErrors.designation && (
                        <small className="text-danger">
                          {offerErrors.designation}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Joining Date</label>

                      <input
                        ref={joiningDateRef}
                        type="date"
                        className="form-control"
                        value={offerJoiningDate}
                        onClick={() => joiningDateRef.current?.showPicker()}
                        onChange={(e) => {
                          setOfferJoiningDate(e.target.value);
                          setOfferErrors((p) => ({ ...p, joiningDate: "" }));
                        }}
                      />

                      {offerErrors.joiningDate && (
                        <small className="text-danger">
                          {offerErrors.joiningDate}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Salary Offered</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ₹8,00,000 / year"
                        value={offerSalary}
                        onChange={(e) => {
                          setOfferSalary(e.target.value);
                          setOfferErrors((p) => ({ ...p, salary: "" }));
                        }}
                      />
                      {offerErrors.salary && (
                        <small className="text-danger">
                          {offerErrors.salary}
                        </small>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter message for candidate"
                        rows="3"
                        value={offerMessage}
                        onChange={(e) => {
                          setOfferMessage(e.target.value);
                          setOfferErrors((p) => ({ ...p, message: "" }));
                        }}
                      />
                      {offerErrors.message && (
                        <small className="text-danger">
                          {offerErrors.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={closeAllModals}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={offerLoading}
                    onClick={handleSendOffer}
                  >
                    {offerLoading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Send Offer"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show" />
        </>
      )}

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
                    <h5 className="modal-title">Send Interview Reschedule</h5>
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
                        "Reschedule Interview"
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
    </>
  );
}
