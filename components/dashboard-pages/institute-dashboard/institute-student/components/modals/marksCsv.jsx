"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import AuditReport from "../audit";

const AddCsvModal = ({ show, onClose, setRefresh = () => {} }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [audit, setAudit] = useState([]);

  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!show) return null;

  // ------------------------------
  // HANDLE FILE SELECTION
  // ------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      setErrorId(Date.now());
      setCsvFile(null);
      return;
    }
    // Check extension
    const extension = file.name.split(".").pop().toLowerCase();
    if (extension !== "csv") {
      setError("Only csv files are allowed.");
      setErrorId(Date.now());
      setCsvFile(null);
      return;
    }

    setError(null);
    setCsvFile(file);
  };

  // ------------------------------
  // SUBMIT CSV IMPORT
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("Institute_token")
        : null;
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    const formPayload = new FormData();
    formPayload.append("role", 1);
    formPayload.append("csv", csvFile);

    try {
      const response = await axios.post(
        `${apiurl}/api/institutestudent/import-candidates-marks`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) throw new Error(response.data.message);

      setSuccess(response.data.message);
      setMessage_id(Date.now());

     /*  if (response.data.total === response.data.created) {
        setTimeout(() => {
          setRefresh(true);
        }, 1000);
      } else if (response.data.audit) {
        setAudit(response.data.audit);
      } */
      setTimeout(() => {
          setRefresh(true);
        }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Import failed. Try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <h5 className="modal-title mb-0">Import Candidate Marks</h5>

              {/* Download Template */}
              <a
                href="/institute-student-import-marks.csv"
                download
                className="btn btn-sm btn-outline-primary"
              >
                Download Template Csv
              </a>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
           {/*  {audit.length > 0 && <AuditReport audit={audit} />} */}

            <form onSubmit={handleSubmit}>
              <MessageComponent
                error={error}
                success={success}
                errorId={errorId}
                message_id={message_id}
              />

              <div className="mb-4">
                <label className="form-label">Upload Csv</label>
                <input
                  type="file"
                  accept=".csv"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  onChange={handleFileChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !csvFile}
              >
                {loading ? "Importing..." : "Import"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCsvModal;
