import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CheckCircle, XCircle, HelpCircle, Eye, Loader, MinusCircle  ,Clock2 } from "lucide-react";
import Link from "next/link";

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("Admin_token");
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
          }
        );
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error.response?.data || error);
        setError(error.response?.data?.message || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [API_URL]);

  // Handle status icons based on the field value
  const renderProcessingIcon = (fieldValue) => {
    if (fieldValue) {
      return <Clock2 size={25} className="text-info" title="Processing" />;
    } else {
      return <MinusCircle size={18} className="text-muted" title="Not Provided" />;
    }
  };

  // DataTable columns configuration
  const columns = [
    {
      name: "Candidate Name",
      selector: (row) => row.candidate_name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.candidate_mobile,
      sortable: true,
    },
    {
      name: "PAN Status",
      selector: (row) => renderProcessingIcon(row.pan_number),
      cell: (row) => renderProcessingIcon(row.pan_number),
    },
    {
      name: "Passport Status",
      selector: (row) => renderProcessingIcon(row.passport_file_number),
      cell: (row) => renderProcessingIcon(row.passport_file_number),
    },
    {
      name: "Aadhaar Status",
      selector: (row) => renderProcessingIcon(row.aadhar_number),
      cell: (row) => renderProcessingIcon(row.aadhar_number),
    },
    {
      name: "DL Status",
      selector: (row) => renderProcessingIcon(row.dl_number),
      cell: (row) => renderProcessingIcon(row.dl_number),
    },
  
    {
      name: "Epic Status",
      selector: (row) => renderProcessingIcon(row.epic_number),
      cell: (row) => renderProcessingIcon(row.epic_number),
    },
 
  ];

  // Custom styles for centering content in the DataTable
  const customStyles = {
    headCells: {
      style: {
        display: 'flex',
        justifyContent: 'center', // Center header content
        alignItems: 'center',
      },
    },
    cells: {
      style: {
        display: 'flex',
        justifyContent: 'center', // Center row content
        alignItems: 'center',
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

  if (error) return <p className="text-danger text-center mt-3">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <DataTable
        title="Applicants"
        columns={columns}
        data={candidates}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}  // Apply the customStyles here
      />
    </div>
  );
};

export default Applicants;
