"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";
import { usePathname } from "next/navigation";

export default function ShortlistedCandidatesPage() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

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

    // 👉 handle API call here
    console.log("Invitation sent to:", selectedCandidate);

    closeModal();
  };

  return (
    <div className={styles.tabsBox}>
      {/* ================= HEADER ================= */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        {/* <h4 className="mb-0">Shortlisted Candidates List</h4> */}

        {/* TOP RIGHT LINKS */}
        <div className={styles.topLinks}>
          <Link
            href="/employers-dashboard/offer-letter"
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/offer-letter") ? styles.active : ""
            }`}
          >
            <i className="la la-envelope"></i>
            Offer Letter Sent
          </Link>

          <Link
            href="/employers-dashboard/invitation"
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/invitation") ? styles.active : ""
            }`}
          >
            <i className="la la-paper-plane"></i>
            Invitation Sent
          </Link>

          <Link
            href="/employers-dashboard/shortlisted"
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/shortlisted") ? styles.active : ""
            }`}
          >
            <i className="la la-user-check"></i>
            Shortlisted Candidates
          </Link>

          <Link
            href="/employers-dashboard/job-applicants"
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/job-applicants")
                ? styles.active
                : ""
            }`}
          >
            <i className="la la-users"></i>
            Job Applicants
          </Link>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-responsive">
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Candidate</th>
              <th style={{ width: "15%" }}>Designation</th>
              <th style={{ width: "12%" }}>Location</th>
              <th style={{ width: "12%" }}>Salary</th>
              <th style={{ width: "18%" }}>Skills</th>
              <th style={{ width: "15%" }}>Experience / Notice Period</th>
              <th style={{ width: "8%", textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {candidatesData.map((candidate) => (
              <tr key={candidate.id}>
                {/* Candidate */}
                <td>
                  <div className="d-flex flex-column align-items-center text-center gap-1">
                    <Image
                      src={candidate.avatar}
                      width={46}
                      height={46}
                      className="rounded-circle"
                      alt={candidate.name}
                    />
                    <Link
                      href={`/candidates-details/${candidate.id}`}
                      className={styles.candidateName}
                    >
                      {candidate.name}
                    </Link>
                  </div>
                </td>

                <td>{candidate.designation}</td>

                <td>
                  <i className="la la-map-marker me-1"></i>
                  {candidate.location}
                </td>

                <td>₹{candidate.monthlySalary} / month</td>

                <td>
                  <div className={styles.skillsWrap}>
                    {candidate.tags.map((tag, index) => (
                      <span key={index} className={styles.skillBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td>
                  {candidate.experience} / {candidate.noticePeriod}
                </td>

                {/* Actions */}
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      title="View Profile"
                    >
                      <i className="la la-eye"></i>
                    </button>

                    <button
                      className="btn btn-outline-info btn-sm"
                      title="Send Invitation"
                      onClick={() => openModal(candidate)}
                    >
                      <i className="la la-paper-plane"></i>
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
                    <p className="mb-3">
                      <strong>Candidate:</strong> {selectedCandidate?.name}
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
                        defaultValue={selectedCandidate?.designation}
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
