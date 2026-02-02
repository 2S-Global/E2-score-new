"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Applicants.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

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

  // loaders
  const [offerLoading, setOfferLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(null);

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

  // loader
  const [remarksLoading, setRemarksLoading] = useState(false);

  // field errors
  const [remarksErrors, setRemarksErrors] = useState({
    communication: "",
    technical: "",
    aptitude: "",
    overall: "",
    message: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= API CALL ================= */
  useEffect(() => {
    fetchInvitedCandidates();
  }, [jobId, token]);

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

  /* ================= HANDLERS ================= */
  const openRemarksModal = (candidate) => {
    setSelectedCandidate(candidate);

    setCommunicationScore("");
    setTechnicalScore("");
    setAptitudeScore("");
    setOverallScore("");
    setRemarksMessage("");

    setRemarksErrors({
      communication: "",
      technical: "",
      aptitude: "",
      overall: "",
      message: "",
    });

    setError("");
    setSuccess("");
    setShowRemarksModal(true);
  };

  const handleSaveRemarks = async () => {
    let errors = {
      communication: "",
      technical: "",
      aptitude: "",
      overall: "",
      message: "",
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

    if (!remarksMessage) errors.message = "Remarks message is required";

    setRemarksErrors(errors);

    if (Object.values(errors).some(Boolean)) return;

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
            communicationSkillScore: communicationScore,
            technicalSkillScore: technicalScore,
            aptitudeScore,
            overallScore,
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
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADER */}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border text-primary" />
                    <div className="mt-2">Loading invitations...</div>
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && candidates.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No invitation sent candidates found
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
                    <td>{c.noticePeriod}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          href={`/candidates-details/${c.userId}`}
                          className="btn btn-outline-primary btn-sm"
                          title="View Candidate Details"
                        >
                          <i className="la la-eye"></i>
                        </Link>

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
                          onClick={() => handleRejectCandidate(c._id)}
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
                          setRemarksErrors((p) => ({ ...p, technical: "" }));
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

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={offerDesignation}
                        placeholder="e.g. Senior Developer"
                        onChange={(e) => {
                          setOfferDesignation(e.target.value);
                          setOfferErrors((p) => ({ ...p, designation: "" }));
                        }}
                      />
                      {offerErrors.designation && (
                        <small className="text-danger">
                          {offerErrors.designation}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Joining Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={offerJoiningDate}
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
    </>
  );
}
