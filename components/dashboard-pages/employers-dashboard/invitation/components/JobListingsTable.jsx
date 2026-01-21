"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Applicants.module.css";

export default function InvitationPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const openModal = (name) => {
    setSelectedCandidate(name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate("");
  };

  return (
    <>
      <div className={styles.tabsBox}>
        {/* ================= HEADER ================= */}
        <div
          className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
        >
          <h4 className="mb-0">Interview Invitation List</h4>

          {/* TOP RIGHT LINKS */}
          <div className={styles.topLinks}>
            <Link
            href="/employers-dashboard/shortlisted"
            className={`${styles.topLink}`}
          >
            <i className="la la-user-check me-1"></i> Shortlisted Candidates
          </Link>
  
            <Link href="/employers-dashboard/offer-letter" className={styles.topLink}>
              <i className="la la-envelope me-1"></i> Offer Letter Sent
            </Link>
  
            <Link
              href="/employers-dashboard/job-applicants"
              className={`${styles.topLink} ${styles.active}`}
            >
              <i className="la la-user"></i> Job Applicants
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
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Notice Period</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* ===== Row 1 ===== */}
              <tr>
                <td className="text-center">
                  <Image
                    src="/images/candidates/candidate-1.jpg"
                    width={42}
                    height={42}
                    className="rounded-circle"
                    alt="Candidate"
                  />
                </td>

                <td>
                  <Link href="#" className={styles.candidateName}>
                    Rahul Sharma
                  </Link>
                </td>

                <td>25 Jan 2026</td>
                <td>11:00 AM</td>

                <td>
                  <span className="badge bg-warning text-dark">Pending</span>
                </td>

                <td>5 Years</td>
                <td>30 Days</td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="la la-eye"></i>
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => openModal("Rahul Sharma")}
                    >
                      <i className="la la-comment"></i>
                    </button>

                    <button className="btn btn-outline-success btn-sm">
                      <i className="la la-envelope"></i>
                    </button>
                  </div>
                </td>
              </tr>

              {/* ===== Row 2 ===== */}
              <tr>
                <td className="text-center">
                  <Image
                    src="/images/candidates/candidate-2.jpg"
                    width={42}
                    height={42}
                    className="rounded-circle"
                    alt="Candidate"
                  />
                </td>

                <td>
                  <Link href="#" className={styles.candidateName}>
                    Sneha Verma
                  </Link>
                </td>

                <td>22 Jan 2026</td>
                <td>02:30 PM</td>

                <td>
                  <span className="badge bg-success">Completed</span>
                </td>

                <td>3 Years</td>
                <td>Immediate</td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="la la-eye"></i>
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => openModal("Sneha Verma")}
                    >
                      <i className="la la-comment"></i>
                    </button>

                    <button className="btn btn-outline-success btn-sm">
                      <i className="la la-envelope"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= REMARKS MODAL ================= */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Interview Remarks – {selectedCandidate}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Communication</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Score (1–10)"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Technical Skills</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Score (1–10)"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Attitude</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Score (1–10)"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Overall Score</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Score (1–10)"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter remarks"
                    ></textarea>
                  </div>
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
                <button type="button" className="btn btn-primary">
                  Save Remarks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}
