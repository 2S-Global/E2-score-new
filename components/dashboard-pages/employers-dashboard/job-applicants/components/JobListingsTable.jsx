"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Applicants.module.css";

export default function JobApplicantsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  const isActive = (path) => pathname === path;

  useEffect(() => {
    if (!jobId || !token) return;

    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/get_all_job_related_candidates?jobId=${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setCandidates(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId, token]);

  return (
    <div className={styles.tabsBox}>
      {/* HEADER */}
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

      {/* TABLE */}
      <div className="table-responsive">
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th className="text-center" style={{ width: "15%" }}>
                Candidate
              </th>
              <th>Job Role</th>
              <th>Current Location</th>
              <th>Expected Salary</th>
              <th>Notice Period</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="mt-2">Loading candidates...</div>
                </td>
              </tr>
            )}

            {!loading && candidates.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No applicants found
                </td>
              </tr>
            )}

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

                  <td>{candidate.noticePeriod}</td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="la la-eye"></i>
                      </button>
                      <button className="btn btn-outline-success btn-sm">
                        <i className="la la-check"></i>
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
    </div>
  );
}
