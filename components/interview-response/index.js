"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import styles from "./InterviewResponse.module.css";
import AnimatedCheckmark from "@/components/common/AnimatedCheckmark/AnimatedCheckmark";

export default function InterviewResponsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const applicationId = searchParams.get("id");
  const jobId = searchParams.get("jobId");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [logo, setLogo] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [responseType, setResponseType] = useState(null); // accept | reject

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  /* ===============================
     Fetch Job Details
  =============================== */
  useEffect(() => {
    if (!applicationId || !jobId) {
      setStatus("error");
      setMessage("Invalid interview link.");
      return;
    }

    if (!API_BASE) {
      setStatus("error");
      setMessage("Server configuration error.");
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/companyprofile/get-company-logo-by-job?jobId=${jobId}`,
        );

        if (res.data?.success) {
          setLogo(res.data.companyLogo || null);
          setJobTitle(res.data.companyName || "");
        }
      } catch (err) {
        console.error("Job details fetch failed:", err);
      }
    };

    fetchJobDetails();
  }, [applicationId, jobId, API_BASE]);

  /* ===============================
     Confetti
  =============================== */
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  /* ===============================
     Handle Accept / Reject
  =============================== */
  const handleResponse = async (accept) => {
    if (status === "loading") return; // prevent double click

    if (!applicationId || !jobId || !API_BASE) {
      setStatus("error");
      setMessage("Invalid request.");
      return;
    }

    try {
      setStatus("loading");
      setResponseType(accept ? "accept" : "reject");

      const res = await axios.post(
        `${API_BASE}/api/jobposting/accept_interview_invitation`,
        {
          applicationId,
          jobId,
          accept,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data?.success) {
        setStatus("success");
        setMessage(res.data.message || "Response submitted successfully.");

        if (accept) {
          fireConfetti();
        }

        setTimeout(() => {
          router.push(
            `/interview-success?type=${accept ? "accept" : "reject"}&jobTitle=${encodeURIComponent(jobTitle)}`,
          );
        }, 2000);
      } else {
        setStatus("error");
        setMessage(res.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setStatus("error");
      setMessage(
        error?.response?.data?.message ||
          "Server not responding. Please try again.",
      );
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {logo && <img src={logo} alt="Company Logo" className={styles.logo} />}

        <div className={styles.title}>Interview Invitation</div>

        {jobTitle && (
          <div className={styles.subtitle}>
            You have been shortlisted for <b>{jobTitle}</b>.
            <br />
            Please confirm your availability.
          </div>
        )}

        {/* IDLE STATE */}
        {status === "idle" && (
          <div className={styles.buttonGroup}>
            <button
              className={styles.acceptBtn}
              onClick={() => handleResponse(true)}
            >
              Accept Interview
            </button>

            <button
              className={styles.rejectBtn}
              onClick={() => handleResponse(false)}
            >
              Decline
            </button>
          </div>
        )}

        {/* LOADING */}
        {status === "loading" && (
          <div className={styles.loading}>Submitting your response...</div>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <div className={styles.successBox}>
            {responseType === "accept" && <AnimatedCheckmark />}
            <strong>
              {responseType === "accept"
                ? "Interview Accepted Successfully!"
                : "Interview Declined"}
            </strong>
            <p>{message}</p>
            <small>Redirecting to dashboard...</small>
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className={styles.errorBox}>
            <strong>Error</strong>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
