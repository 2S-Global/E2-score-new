"use client"; // Required in Next.js App Router
import React, { useState } from "react";
import { BadgeAlert, BadgeCheck, FileText, OctagonAlert } from "lucide-react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";

export const DocumentsTable = ({ user, handleclick }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const handleDownload = async (id, name) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        `${apiurl}/api/pdf/otp-generate-pdf`,
        { order_id: id },
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSuccess("PDF downloaded successfully!");
      setMessage_id(Date.now());
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Failed to download PDF. Please try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (key) => {
    if (!user?.[key]) {
      return <OctagonAlert className="text-danger" size={20} />;
    }
    return user[key]?.response_code == 100 || user[key]?.status_code == 200 ? (
      <BadgeCheck
        className="text-success cursor-pointer"
        size={20}
        onClick={() => handleclick(key)}
      />
    ) : (
      <BadgeAlert
        className="text-warning cursor-pointer"
        size={20}
        onClick={() => handleclick(key)}
      />
    );
  };

  return (
    <div className="table-responsive">
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ minWidth: "200px" }}>Candidate Name</th>
            <th style={{ minWidth: "100px" }}>PAN</th>
            <th style={{ minWidth: "100px" }}>Passport</th>
            <th style={{ minWidth: "100px" }}>Aadhar With OTP</th>
            <th style={{ minWidth: "100px" }}>DL</th>
            <th style={{ minWidth: "100px" }}>EPIC</th>
            <th style={{ minWidth: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3">{user?.candidate_name || "N/A"}</td>
            {[
              "pan_response",
              "passport_response",
              "aadhaar_response",
              "dl_response",
              "epic_response",
            ].map((key, index) => (
              <td key={index} className="py-3">
                {getStatusIcon(key)}
              </td>
            ))}
            <td className="py-3">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <FileText
                  className="text-primary cursor-pointer"
                  size={20}
                  onClick={() => handleDownload(user._id, user.candidate_name)}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
