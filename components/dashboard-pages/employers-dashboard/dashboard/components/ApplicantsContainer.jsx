"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Applicants.module.css";
import axios from "axios";

const ApplicantsContainer = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH APPLICANTS
  ====================== */
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("employer_token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/getLatestApplicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCandidates(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className={styles.tabsBox}>
      <div
        className="table-responsive"
        style={{ position: "relative", left: "-25px", overflow: "unset" }}
      >
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th style={{ width: "20%" }} className="text-center">
                Candidate
              </th>
              <th style={{ width: "15%" }} className="text-center">
                Designation
              </th>
              <th style={{ width: "12%" }} className="text-center">
                Location
              </th>
              <th style={{ width: "15%" }} className="text-center">
                Experience / Notice Period
              </th>
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : candidates.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No applicants found
                </td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate._id}>
                  {/* Candidate */}
                  <td className="text-center">
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

                      <Link
                        href={`/candidates-details/${candidate.userId}`}
                        className={styles.candidateName}
                        target="_blank"
                      >
                        {candidate.candidateName}
                      </Link>
                    </div>
                  </td>

                  {/* Designation */}
                  <td className="text-center">{candidate.jobRole || "-"}</td>

                  {/* Location */}
                  <td className="text-center">
                    <i className="la la-map-marker me-1"></i>
                    {candidate.currentLocation || "-"}
                  </td>

                  {/* Experience / Notice Period */}
                  <td className="text-center">
                    {candidate.experienceLevel
                      ? `${candidate.experienceLevel} yrs`
                      : "-"}{" "}
                    / {candidate.noticePeriod || "-"}
                  </td>

                  {/* Action */}
                  <td className="text-center">
                    <a
                      href={`/employers-dashboard/job-applicants?jobId=${candidate.jobId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                      title="View"
                    >
                      <i className="la la-eye"></i>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsContainer;
