"use client";

import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";

export default function JobApplicantsPage() {
  return (
    <div className={styles.tabsBox}>
      {/* HEADER */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        <h4 className="mb-0">Job Applicants</h4>

    
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
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="la la-eye"></i>
                    </button>
                    <button className="btn btn-outline-success btn-sm">
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
