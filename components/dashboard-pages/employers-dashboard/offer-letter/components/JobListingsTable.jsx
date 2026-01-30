"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Applicants.module.css";
import { usePathname, useSearchParams } from "next/navigation";

export default function OfferLetterPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const isActive = (path) => pathname === path;

  /* ================= STATES ================= */
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  /* ================= API CALL ================= */
  useEffect(() => {
    if (!jobId || !token) return;

    const fetchOfferSentCandidates = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/get_all_job_related_offer_sent_candidates?jobId=${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setCandidates(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch offer sent candidates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferSentCandidates();
  }, [jobId, token]);

  return (
    <div className={styles.tabsBox}>
      {/* ================= HEADER ================= */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        <div className={styles.topLinks}>
          <Link
            href={`/employers-dashboard/offer-letter?jobId=${jobId}`}
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/offer-letter") ? styles.active : ""
            }`}
          >
            <i className="la la-envelope"></i>
            Offer Letter Sent
          </Link>

          <Link
            href={`/employers-dashboard/invitation?jobId=${jobId}`}
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/invitation") ? styles.active : ""
            }`}
          >
            <i className="la la-paper-plane"></i>
            Invitation Sent
          </Link>

          <Link
            href={`/employers-dashboard/shortlisted?jobId=${jobId}`}
            className={`${styles.topLink} ${
              isActive("/employers-dashboard/shortlisted") ? styles.active : ""
            }`}
          >
            <i className="la la-user-check"></i>
            Shortlisted Candidates
          </Link>

          <Link
            href={`/employers-dashboard/job-applicants?jobId=${jobId}`}
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
              <th className="text-center" style={{ width: "20%" }}>
                Candidate
              </th>
              <th>Designation</th>
              <th>Salary Offered</th>
              <th>Joining Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}
            {loading && (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" />
                  <div className="mt-2">Loading offer sent candidates...</div>
                </td>
              </tr>
            )}

            {/* EMPTY */}
            {!loading && candidates.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No offer sent candidates found
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              candidates.map((c) => (
                <tr key={c.userId}>
                  {/* Candidate */}
                  <td>
                    <div className="d-flex flex-column align-items-center text-center gap-1">
                      <div className={styles.candidateAvatar}>
                        <Image
                          src={c.profilePicture || "/images/default-avatar.png"}
                          alt={c.candidateName}
                          fill
                          sizes="50px"
                          className={styles.avatarImg}
                        />
                      </div>

                      <Link
                        href={`/candidates-details/${c.userId}`}
                        className={styles.candidateName}
                      >
                        {c.candidateName}
                      </Link>
                    </div>
                  </td>

                  <td>{c.jobRole || "-"}</td>

                  <td>{c.offer_letter_salary}</td>

                  <td>
                    {c.offer_letter_joining_date
                      ? new Date(
                          c.offer_letter_joining_date,
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        href={`/candidates-details/${c.userId}`}
                        className="btn btn-outline-primary btn-sm"
                        title="View Candidate Details"
                      >
                        <i className="la la-eye"></i>
                      </Link>

                      {/* <button
                        className="btn btn-outline-danger btn-sm"
                        title="Reject"
                      >
                        <i className="la la-times"></i>
                      </button> */}
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
