"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Applicants.module.css";
import { usePathname, useSearchParams } from "next/navigation";

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

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= API CALL ================= */
  useEffect(() => {
    if (!jobId || !token) return;

    const fetchInvitedCandidates = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/get_all_job_related_invitation_sent_candidates?jobId=${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setCandidates(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch invitation list", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitedCandidates();
  }, [jobId, token]);

  /* ================= HANDLERS ================= */
  const openRemarksModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowRemarksModal(true);
  };

  const openOfferModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowOfferModal(true);
  };

  const closeAllModals = () => {
    setShowRemarksModal(false);
    setShowOfferModal(false);
    setSelectedCandidate(null);
  };

  return (
    <>
      <div className={styles.tabsBox}>
        {/* ================= HEADER ================= */}
        <div
          className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
        >
          <div className={styles.topLinks}>
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

            <Link
              href={`/employers-dashboard/invitation?jobId=${jobId}`}
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/invitation") ? styles.active : ""
              }`}
            >
              <i className="la la-paper-plane"></i> Invitation Sent
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
              href={`/employers-dashboard/job-applicants?jobId=${jobId}`}
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/job-applicants")
                  ? styles.active
                  : ""
              }`}
            >
              <i className="la la-users"></i> Job Applicants
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
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="la la-eye"></i>
                        </button>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => openRemarksModal(c)}
                        >
                          <i className="la la-comment"></i>
                        </button>

                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => openOfferModal(c)}
                        >
                          <i className="la la-envelope"></i>
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
                    {[
                      "Communication",
                      "Technical Skills",
                      "Attitude",
                      "Overall Score",
                    ].map((label) => (
                      <div className="col-md-6" key={label}>
                        <label className="form-label">{label}</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Score (1–10)"
                        />
                      </div>
                    ))}

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter remarks"
                      />
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
                  <button className="btn btn-primary">Save Remarks</button>
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
                        placeholder="e.g. Senior Developer"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Joining Date</label>
                      <input type="date" className="form-control" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Salary Expectation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ₹8,00,000 / year"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter message for candidate"
                      />
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
                  <button className="btn btn-primary">Send Offer</button>
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
