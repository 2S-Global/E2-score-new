"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InterviewResponsePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const applicationId = searchParams.get("id");
  const type = searchParams.get("type"); // accept | reject

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!applicationId || !type) {
      setStatus("error");
      setMessage("Invalid interview link");
      return;
    }

    let redirectTimer;

    const submitResponse = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/accept_interview_invitation`,
          {
            applicationId,
            accept: type === "accept",
          },
        );

        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message);

          // ⏳ redirect after 3 seconds
          redirectTimer = setTimeout(() => {
            router.push("/candidates-dashboard/dashboard");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(res.data.message || "Something went wrong");
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Link is invalid or has expired. Please contact support for assistance.",
        );
      }
    };

    submitResponse();

    // 🧹 cleanup timeout
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [applicationId, type, router]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        {/* 🔄 Loader */}
        {status === "loading" && (
          <>
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            />
            <h5 className="mt-3">Processing your response...</h5>
          </>
        )}

        {/* ✅ Success */}
        {status === "success" && (
          <div
            className={`alert ${
              type === "accept" ? "alert-success" : "alert-warning"
            }`}
            role="alert"
          >
            <h4 className="alert-heading">
              {type === "accept"
                ? "Interview Accepted 🎉"
                : "Interview Rejected"}
            </h4>
            <p className="mb-2">{message}</p>
            <small className="text-muted">
              Redirecting to your dashboard...
            </small>
          </div>
        )}

        {/* ❌ Error */}
        {status === "error" && (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Invalid Link</h4>
            <p className="mb-0">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
