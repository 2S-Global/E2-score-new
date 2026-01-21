"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Applicants.module.css";
import { usePathname } from "next/navigation";

export default function InvitationPage() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  /* ================= STATES ================= */
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  /* ================= HANDLERS ================= */
  const openRemarksModal = (name) => {
    setSelectedCandidate(name);
    setShowRemarksModal(true);
  };

  const openOfferModal = (name) => {
    setSelectedCandidate(name);
    setShowOfferModal(true);
  };

  const closeAllModals = () => {
    setShowRemarksModal(false);
    setShowOfferModal(false);
    setSelectedCandidate("");
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
              href="/employers-dashboard/offer-letter"
              className={`${styles.topLink} ${
                isActive("/employers-dashboard/offer-letter")
                  ? styles.active
                  : ""
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
                isActive("/employers-dashboard/shortlisted")
                  ? styles.active
                  : ""
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
              {[
                {
                  name: "Rahul Sharma",
                  img: "/images/resource/candidate-1.png",
                  status: "Pending",
                  statusClass: "bg-warning text-dark",
                  exp: "5 Years",
                  notice: "30 Days",
                  date: "25 Jan 2026",
                  time: "11:00 AM",
                },
                {
                  name: "Sneha Verma",
                  img: "/images/resource/candidate-3.png",
                  status: "Completed",
                  statusClass: "bg-success",
                  exp: "3 Years",
                  notice: "Immediate",
                  date: "22 Jan 2026",
                  time: "02:30 PM",
                },
              ].map((c, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <div className={styles.candidateAvatar}>
                      <Image
                        src={c.img}
                        alt={c.name}
                        fill
                        sizes="50px"
                        quality={100}
                        unoptimized
                        className={styles.avatarImg}
                      />
                    </div>
                  </td>

                  <td>
                    <Link href="#" className={styles.candidateName}>
                      {c.name}
                    </Link>
                  </td>

                  <td>{c.date}</td>
                  <td>{c.time}</td>

                  <td>
                    <span className={`badge ${c.statusClass}`}>{c.status}</span>
                  </td>

                  <td>{c.exp}</td>
                  <td>{c.notice}</td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="la la-eye"></i>
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => openRemarksModal(c.name)}
                      >
                        <i className="la la-comment"></i>
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => openOfferModal(c.name)}
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
                    Interview Remarks – {selectedCandidate}
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
                    Offer Discussion – {selectedCandidate}
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
