"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import styles from "./InterviewSuccess.module.css";

export default function InterviewSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type");
  const jobTitle = searchParams.get("jobTitle");

  useEffect(() => {
    if (type === "accept") {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [type]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {type === "accept" ? (
          <>
            <div className={styles.successIcon}>🎉</div>
            <h2>Interview Confirmed!</h2>
            <p>
              You have successfully accepted the interview invitation
              {jobTitle && (
                <>
                  {" "}
                  for <strong>{jobTitle}</strong>
                </>
              )}
              .
            </p>
          </>
        ) : (
          <>
            <div className={styles.rejectIcon}>❌</div>
            <h2>Interview Declined</h2>
            <p>
              You have declined the interview invitation
              {jobTitle && (
                <>
                  {" "}
                  for <strong>{jobTitle}</strong>
                </>
              )}
              .
            </p>
          </>
        )}

        <button
          className={styles.dashboardBtn}
          onClick={() => router.push("/candidates-dashboard/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
