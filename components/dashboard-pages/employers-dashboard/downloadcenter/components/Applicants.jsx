"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import MessageComponent from "@/components/common/ResponseMsg";

import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Eye,
  Loader,
  MinusCircle,
  Clock2,
  Download,
} from "lucide-react";
import Link from "next/link";

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [success, setSuccess] = useState(null);
  const [rowLoading, setRowLoading] = useState({});

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("employer_token");
        if (!token) {
          console.error("Error: No token found in localStorage");
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${API_URL}/api/usercart/getPaidUserVerificationCartByEmployer`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log("API Response:", response.data.data);
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

    // Call immediately when component mounts
    fetchCandidates();

    // Then run every 60 seconds
    const interval = setInterval(() => {
      fetchCandidates();
    }, 30000);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [API_URL]);

  // const handleDownload = async (fileUrl) => {
  //   if (!fileUrl) {
  //     alert("No file available for download");
  //     return;
  //   }
  // };

  const handleDownload = async (url, data, rowId, name) => {
    // Set loading state for the specific row to true
    setRowLoading((prev) => ({ ...prev, [rowId]: true }));

    try {
      const token = localStorage.getItem("employer_token");
      if (!token) {
        setError("No token found");
        return;
      }

      // Make the request to the backend with the correct URL and data
      const response = await axios.post(url, data, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Set success message
      setSuccess("PDF downloaded successfully!");
      setErrorId(null); // Clear any previous error messages
    } catch (err) {
      setErrorId("Failed to download PDF. Please try again.");
    } finally {
      // Set loading state for the specific row to false
      setRowLoading((prev) => ({ ...prev, [rowId]: false }));
    }
  };

  const renderProcessingIcon = (docNumber, docName, response) => {
    if (docNumber || docName) {
      if (response) {
        switch (response.response_code) {
          case "100":
            return (
              <span title="Valid Authentication">
                <CheckCircle size={14} className="text-success" />
              </span>
            );
          case "101":
            return (
              <span title="Invalid Authentication">
                <XCircle size={14} className="text-danger" />
              </span>
            );
          default:
            if (response?.status === "success") {
              return (
                <span title="Valid Authentication">
                  <CheckCircle size={14} className="text-success" />
                </span>
              );
            }

            return (
              <span title="Not Applied">
                <MinusCircle size={14} className="text-warning" />
              </span>
            );
        }
      }
      return (
        <span title="Processing">
          <Clock2 size={14} className="text-info" />
        </span>
      );
    }

    return (
      <span title="Not Applied">
        <MinusCircle size={14} className="text-muted" />
      </span>
    );
  };

  const RenderOverall = (overallstatus) => {
    const status = overallstatus?.toLowerCase();

    switch (status) {
      case "processing":
        return (
          <span
            title="Processing"
            style={{ color: "#FFA500", fontWeight: "bold" }}
          >
            Processing
          </span>
        );

      case "verified":
        return (
          <span
            title="Completed"
            style={{ color: "#28a745", fontWeight: "bold" }}
          >
            Completed
          </span>
        );

      default:
        return (
          <span
            title="Unknown"
            style={{ color: "#6c757d", fontWeight: "bold" }}
          >
            Unknown
          </span>
        );
    }
  };

  // DataTable columns configuration
  const columns = [
    {
      name: "Id",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Candidate Name",
      selector: (row) => row.candidate_name,
      sortable: true,
    },
    {
      name: "Overall Status",
      selector: (row) => RenderOverall(row.status),
    },
    {
      name: "PAN",
      selector: (row) =>
        renderProcessingIcon(row.pan_number, row.pan_name, row.pan_response),
      cell: (row) =>
        renderProcessingIcon(row.pan_number, row.pan_name, row.pan_response),
    },
    {
      name: "Passport",
      selector: (row) =>
        renderProcessingIcon(
          row.passport_file_number,
          row.passport_name,
          row.passport_response,
        ),
      cell: (row) =>
        renderProcessingIcon(
          row.passport_file_number,
          row.passport_name,
          row.passport_response,
        ),
    },
    {
      name: "Aadhaar",
      selector: (row) =>
        renderProcessingIcon(
          row.aadhar_number,
          row.aadhar_name,
          row.aadhaar_response,
        ),
      cell: (row) =>
        renderProcessingIcon(
          row.aadhar_number,
          row.aadhar_name,
          row.aadhaar_response,
        ),
    },
    {
      name: "DL",
      selector: (row) =>
        renderProcessingIcon(row.dl_number, row.dl_name, row.dl_response),
      cell: (row) =>
        renderProcessingIcon(row.dl_number, row.dl_name, row.dl_response),
    },
    {
      name: "Epic",
      selector: (row) =>
        renderProcessingIcon(row.epic_number, row.epic_name, row.epic_response),
      cell: (row) =>
        renderProcessingIcon(row.epic_number, row.epic_name, row.epic_response),
    },
    {
      name: "UAN",
      selector: (row) =>
        renderProcessingIcon(row.uan_number, row.uan_name, row.uan_response),
      cell: (row) =>
        renderProcessingIcon(row.uan_number, row.uan_name, row.uan_response),
    },
    {
      name: "Verified At",
      selector: (row) =>
        row.all_verified === 1
          ? new Date(row.updatedAt).toLocaleDateString("en-GB")
          : "-",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          {row.aadhat_otp === "yes" ? (
            <Link
              href={`/employers-dashboard/list-verified-employee/detailsaadhar?id=${row._id}`}
              passHref
            >
              <button className="btn btn-sm" title="View Details">
                <Eye size={16} className="me-1 text-primary" />
              </button>
            </Link>
          ) : (
            <Link
              href={`/employers-dashboard/list-verified-employee/details?id=${row._id}`}
              passHref
            >
              <button className="btn btn-sm" title="View Details">
                <Eye size={16} className="me-1 text-primary" />
              </button>
            </Link>
          )}
          <button
            onClick={() => {
              // Dynamically set the URL based on the `aadhat_otp` field
              const url =
                row.aadhat_otp === "yes"
                  ? `${API_URL}/api/pdf/otp-generate-pdf`
                  : `${API_URL}/api/pdf/generate-pdf`;

              // Pass the URL, data (order_id and file_url), and rowId (row._id) to handleDownload
              handleDownload(
                url,
                {
                  order_id: row._id,
                  file_url: row.file_url,
                },
                row._id,
                row.candidate_name,
              );
            }}
            className="btn btn-link p-0"
            title="Download File"
            disabled={row.all_verified === 0 || rowLoading[row._id]} // Disable when all_verified = 0 or the row is loading
            style={{
              opacity: row.all_verified === 0 || rowLoading[row._id] ? 0.5 : 1,
              cursor:
                row.all_verified === 0 || rowLoading[row._id]
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {rowLoading[row._id] ? (
              <Loader size={20} className="text-success spin-loader" />
            ) : (
              <Download
                size={20}
                className={
                  row.all_verified === 0 ? "text-muted" : "text-success"
                }
              />
            )}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: 1,
    },
  ];

  // Custom styles for centering content in the DataTable
  const customStyles = {
    headCells: {
      style: {
        display: "flex",
        justifyContent: "center", // Center header content
        alignItems: "center",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center", // Center row content
        alignItems: "center",
      },
    },
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <p className="text-danger text-center mt-3">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <MessageComponent error={errorId} success={success} />
      <DataTable
        title=""
        columns={columns}
        data={candidates}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles} // Apply the customStyles here
      />
    </div>
  );
};

export default Applicants;
