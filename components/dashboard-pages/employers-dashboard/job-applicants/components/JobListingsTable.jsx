"use client";

import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";
import { usePathname } from "next/navigation";

export default function JobApplicantsPage() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className={styles.tabsBox}>
      {/* HEADER */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        {/* <h4 className="mb-0">Job Applicants list</h4> */}

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

      {/* TABLE */}
      <div className="table-responsive">
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Designation</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Skills</th>
              <th>Experience / Notice Period</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {candidatesData.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="d-flex flex-column align-items-center text-center gap-1">
                    <div className={styles.candidateAvatar}>
                      <Image
                        src={candidate.avatar}
                        alt={candidate.name}
                        fill
                        sizes="50px"
                        className={styles.avatarImg}
                      />
                    </div>

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
                <td>₹{candidate.monthlySalary} /month</td>

                <td>
                  <div className={styles.skillsWrap}>
                    {candidate.tags.map((tag, i) => (
                      <span key={i} className={styles.skillBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td>
                  {candidate.experience} / {candidate.noticePeriod}
                </td>

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
                      title="Approve"
                    >
                      <i className="la la-check"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      title="Reject"
                    >
                      <i className="la la-times-circle-o"></i>
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
