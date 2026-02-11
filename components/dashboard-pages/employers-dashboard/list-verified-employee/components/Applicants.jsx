"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Eye,
  MinusCircle,
  Download,
} from "lucide-react";
import axios from "axios";

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search filter state

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Fetch API URL from .env

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("employer_token");
        console.log("Fetching candidates with token:", token);

        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${API_URL}/api/admin/cart/getAllVerifiedCandidateAdmin`,
          {}, // 👈 POST body (keep empty if backend doesn't need data)
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCandidates(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching candidates:",
          error.response?.data || error,
        );
        setError(error.response?.data?.message || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [API_URL]);

  // ✅ Function to render verification status icons
  const renderVerificationStatus = (response) => {
    if (!response)
      return (
        <span className="d-flex align-items-center">
          <MinusCircle size={14} className="text-muted">
            <title>Not Applied</title>
          </MinusCircle>
        </span>
      );

    switch (response.response_code) {
      case "100":
        return (
          <span className="d-flex align-items-center">
            <CheckCircle size={14} className="text-success">
              <title>Valid Authentication</title>
            </CheckCircle>
          </span>
        );
      case "101":
        return (
          <span className="d-flex align-items-center">
            <XCircle size={14} className="text-danger">
              <title>Invalid Authentication</title>
            </XCircle>
          </span>
        );
      default:
        return (
          <span className="d-flex align-items-center">
            <MinusCircle size={14} className="text-muted">
              <title>Not Applied</title>
            </MinusCircle>
          </span>
        );
    }
  };

  // ✅ Define DataTable columns
  const columns = [
    {
      name: "Candidate Name",
      selector: (row) => row.candidate_name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.candidate_mobile,
    },
    {
      name: "Pan Status",
      selector: (row) => renderVerificationStatus(row.pan_response),
      cell: (row) => renderVerificationStatus(row.pan_response),
    },
    {
      name: "Passport Status",
      selector: (row) => renderVerificationStatus(row.passport_response),
      cell: (row) => renderVerificationStatus(row.passport_response),
    },
    {
      name: "Aadhaar Status",
      selector: (row) => renderVerificationStatus(row.aadhaar_response),
      cell: (row) => renderVerificationStatus(row.aadhaar_response),
    },
    {
      name: "DL Status",
      selector: (row) => renderVerificationStatus(row.dl_response),
      cell: (row) => renderVerificationStatus(row.dl_response),
    },
    {
      name: "Epic Status",
      selector: (row) => renderVerificationStatus(row.epic_response),
      cell: (row) => renderVerificationStatus(row.epic_response),
    },
    {
      name: "Verified At",
      selector: (row) => row.date,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          {/* View Button */}
          <Link
            href={`/employers-dashboard/list-verified-employee/details?id=${row.id}`}
            passHref
          >
            <button className="btn btn-sm" title="View Details">
              <Eye size={16} className="me-1 text-primary" />
            </button>
          </Link>

          {/* Download Button */}
          <button className="bg border-0 p-0" title="Download File">
            <Download size={18} className="text-success" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: 1,
    },
  ];

  // ✅ Filter candidates based on search
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.candidate_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // ✅ Loader UI when fetching data
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  // ✅ Error UI if API call fails
  if (error)
    return <p className="text-danger text-center mt-3">Error: {error}</p>;

  return (
    <div className="container mt-4">
      {/* DataTable */}
      <DataTable
        title="Applicants"
        columns={columns}
        data={filteredCandidates}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default Applicants;
