"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Applicants.module.css";
import MessageComponent from "@/components/common/ResponseMsg";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

export default function JobApplicantsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
const [showRejectModal, setShowRejectModal] = useState(false);
const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const statusLabelMap = {
    applied: "Applied",
    shortlisted: "Shortlisted",
    invitation_sent: "Interview Scheduled",
    offer_sent: "Offer Sent",
    rejected: "Rejected",
  };

  const statusClassMap = {
    applied: "badge bg-secondary",
    shortlisted: "badge bg-info",
    invitation_sent: "badge bg-warning",
    offer_sent: "badge bg-success",
    rejected: "badge bg-danger",
  };

  const capitalize = (value) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A";
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  const isActive = (path) => pathname === path;

  useEffect(() => {
    fetchCandidates();
  }, [jobId, token]);

  const fetchCandidates = async () => {
    if (!jobId || !token) return;

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
    } catch (err) {
      console.error(err);
      setError("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationAction = async (applicationId, actionType) => {
    if (!token) return;

    setError("");
    setSuccess("");
    setActionLoading(applicationId);

    const apiMap = {
      accept: "/api/jobposting/accept_job_application_status",
      reject: "/api/jobposting/reject_job_application_status",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${apiMap[actionType]}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ applicationId }),
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(result.message); // ✅ API success message
        await fetchCandidates(); // 🔁 RE-FETCH TABLE
      } else {
        setError(result?.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setActionLoading(null); // 🔥 stop loader
    }
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div className={styles.tabsBox}>
        {/* HEADER */}
        <div
          className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
        >
          <div className={styles.topLinks}>
            <Link
              href={`/employers-dashboard/job-applicants?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/job-applicants") ? styles.active : ""}`}
            >
              <i className="la la-users"></i>Applicants
            </Link>

            <Link
              href={`/employers-dashboard/shortlisted?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/shortlisted") ? styles.active : ""}`}
            >
              <i className="la la-user-check"></i> Shortlisted Candidates
            </Link>
            <Link
              href={`/employers-dashboard/invitation?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/invitation") ? styles.active : ""}`}
            >
              <i className="la la-paper-plane"></i> Interview Letter
            </Link>
            <Link
              href={`/employers-dashboard/offer-letter?jobId=${jobId}`}
              className={`${styles.topLink} ${isActive("/employers-dashboard/offer-letter") ? styles.active : ""}`}
            >
              <i className="la la-envelope"></i> Offer Letter Sent
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
                <th>Experience</th>
                <th>Notice Period</th>
                <th>Status</th>
                <th>Details</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-2">Loading candidates...</div>
                  </td>
                </tr>
              )}

              {!loading && candidates.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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

                    {/* <td>
                      ₹{candidate.expectedSalary?.salary}{" "}
                      {candidate.expectedSalary?.currency}
                    </td> */}

                    <td>{candidate.experienceLevel} Years</td>
                    <td>{candidate.noticePeriod}</td>
                    <td>
                      <span
                        className={
                          statusClassMap[candidate.status] || "badge bg-light"
                        }
                      >
                        {statusLabelMap[candidate.status] || candidate.status}
                      </span>
                    </td>
                    <td className={styles.detailsCell}>
                      <ul
                        className={`list-unstyled mb-0 small ${styles.detailsList}`}
                      >
                        <li style={{ textAlign: "left" }}>
                          <strong>Preferred Time:</strong>{" "}
                          {capitalize(candidate.preferredTime)}
                        </li>
                        <li style={{ textAlign: "left" }}>
                          <strong>Saturday Available:</strong>{" "}
                          {capitalize(candidate.availabilityOnSaturday)}
                        </li>
                        <li style={{ textAlign: "left" }}>
                          <strong>Relocate:</strong>{" "}
                          {capitalize(candidate.willingToRelocate)}
                        </li>
                      </ul>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          href={`/candidates-details/${candidate.userId}`}
                          className="btn btn-outline-primary btn-sm"
                          title="View Candidate Details"
                          target="_blank"
                        >
                          <i className="la la-eye"></i>
                        </Link>

                        {/* ACCEPT */}
                        {candidate.status === "applied" && (
                          <button
                            className="btn btn-outline-success btn-sm"
                            disabled={actionLoading === candidate._id}
                            title="Accept Application"
                            onClick={() =>
                              handleApplicationAction(candidate._id, "accept")
                            }
                          >
                            {actionLoading === candidate._id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              />
                            ) : (
                              <i className="la la-check"></i>
                            )}
                          </button>
                        )}

                        {candidate.status !== "rejected" && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            disabled={actionLoading === candidate._id}
                            onClick={() => {
                              setSelectedApplicationId(candidate._id);
                              setShowRejectModal(true);
                            }}
                            title="Reject Application"
                          >
                            {actionLoading === candidate._id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              />
                            ) : (
                              <i className="la la-times"></i>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedApplicationId(null);
        }}
        title="Reject Application"
        message="Are you sure you want to reject this application?"
        confirmText="Yes, Reject"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          if (selectedApplicationId) {
            await handleApplicationAction(selectedApplicationId, "reject");
          }
          setShowRejectModal(false);
          setSelectedApplicationId(null);
        }}
      />
    </>
  );
}
