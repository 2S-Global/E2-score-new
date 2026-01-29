"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Applicants.module.css";

export default function ShortlistedCandidatesPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const isActive = (path) => pathname === path;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= FETCH SHORTLISTED CANDIDATES ================= */
  useEffect(() => {
    if (!jobId || !token) return;

    const fetchShortlistedCandidates = async () => {
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

    fetchShortlistedCandidates();
  }, [jobId, token]);

  /* ================= MODAL HANDLERS ================= */
  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invitation sent to:", selectedCandidate);
    closeModal();
  };

  return (
    <div className={styles.tabsBox}>
      {/* ================= HEADER ================= */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        <div className={styles.topLinks}>
          <Link
            href={`/employers-dashboard/offer-letter?jobId=${jobId}`}
            className={`${styles.topLink} ${isActive("/employers-dashboard/offer-letter") ? styles.active : ""}`}
          >
            <i className="la la-envelope"></i> Offer Letter Sent
          </Link>

          <Link
            href={`/employers-dashboard/invitation?jobId=${jobId}`}
            className={`${styles.topLink} ${isActive("/employers-dashboard/invitation") ? styles.active : ""}`}
          >
            <i className="la la-paper-plane"></i> Invitation Sent
          </Link>

          <Link
            href={`/employers-dashboard/shortlisted?jobId=${jobId}`}
            className={`${styles.topLink} ${isActive("/employers-dashboard/shortlisted") ? styles.active : ""}`}
          >
            <i className="la la-user-check"></i> Shortlisted Candidates
          </Link>

          <Link
            href={`/employers-dashboard/job-applicants?jobId=${jobId}`}
            className={`${styles.topLink} ${isActive("/employers-dashboard/job-applicants") ? styles.active : ""}`}
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
              <th className="text-center">Candidate</th>
              <th>Job Role</th>
              <th>Current Location</th>
              <th>Expected Salary</th>
              <th>Experience / Notice</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADER */}
            {loading && (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" />
                  <div className="mt-2">Loading shortlisted candidates...</div>
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

                  <td>
                    ₹{candidate.expectedSalary?.salary}{" "}
                    {candidate.expectedSalary?.currency}
                  </td>

                  <td>
                    {candidate.experienceLevel} Years / {candidate.noticePeriod}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="la la-eye"></i>
                      </button>

                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => openModal(candidate)}
                      >
                        <i className="la la-paper-plane"></i>
                      </button>

                      <button className="btn btn-outline-danger btn-sm">
                        <i className="la la-times"></i>
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

                    <div className="mb-3">
                      <label className="form-label">Interview Date</label>
                      <input type="date" className="form-control" required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Interview Time</label>
                      <input type="time" className="form-control" required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Designation For</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedCandidate?.jobRole}
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Send Invitation
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
  );
}
