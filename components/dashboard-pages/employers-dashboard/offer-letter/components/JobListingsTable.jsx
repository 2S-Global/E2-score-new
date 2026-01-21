"use client";

import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";
import { usePathname } from "next/navigation";

export default function OfferLetterPage() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  return (
    <div className={styles.tabsBox}>
      {/* ================= HEADER ================= */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        {/* <h4 className="mb-0">Offer Letter Sent List</h4> */}

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

                {/* Designation */}
                <td>{candidate.designation}</td>

                {/* Location */}
                <td>
                  <i className="la la-map-marker me-1"></i>
                  {candidate.location}
                </td>

                {/* Salary */}
                <td>₹{candidate.monthlySalary} / month</td>

                {/* Skills */}
                <td>
                  <div className={styles.skillsWrap}>
                    {candidate.tags.map((tag, index) => (
                      <span key={index} className={styles.skillBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Experience / Notice */}
                <td>
                  {candidate.experience} / {candidate.noticePeriod}
                </td>

                {/* Actions */}
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      title="View"
                    >
                      <i className="la la-eye"></i>
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm"
                      title="Accept Offer"
                    >
                      <i className="la la-check"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
