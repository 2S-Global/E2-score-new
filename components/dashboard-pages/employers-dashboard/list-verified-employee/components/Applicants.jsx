import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, CheckCircle, XCircle, Eye,HelpCircle  } from "lucide-react";
import axios from "axios";

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Fetch from .env

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("Admin_token"); // Ensure token exists
        if (!token) {
          console.error("Error: No token found in localStorage");
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/verify/listUserVerifiedList`, {
          headers: { Authorization: `Bearer ${token}` },
        });
     
          
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

  // ✅ Loader UI when loading
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  // ✅ Error UI if API call fails
  if (error) return <p className="text-danger text-center mt-3">Error: {error}</p>;

  return (
    <div className="row">
      {candidates.map((candidate) => (
        <div key={candidate._id} className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-3 d-flex flex-column">
              {/* Name & Location */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-truncate m-0">{candidate.candidate_name}</h6>
                <span className="text-muted small d-flex align-items-center">
            {candidate.candidate_mobile}
                </span>
              </div>

              {/* Verification List */}
              <ul className="list-group list-group-flush flex-grow-1">
  {[
    {
      label: "PAN",
      response: candidate.pan_response,
    },
    {
      label: "Aadhar",
      response: candidate.aadhar_response,
    },
    {
      label: "Voter",
      response: candidate.epic_response,
    },
    {
      label: "License",
      response: candidate.dl_response,
    },
    {
      label: "Passport",
      response: candidate.passport_response,
    },
  ].map((item, index) => {
    let statusIcon;
// console.log(item.response.request_id);
    if (item.response) {
      if (item.response.response_code === "100") {
        statusIcon = <CheckCircle size={14} className="text-success" title="Valid Authentication" />;
      } else if (item.response.response_code === "101") {
        statusIcon = <XCircle size={14} className="text-danger" title="Invalid Authentication" />;
      } else {
        statusIcon = <HelpCircle size={14} className="text-warning" title="Not Applied" />;
      }
    } else {
      statusIcon = <HelpCircle size={14} className="text-warning" title="Not Applied" />;
    }

    return (
      <li key={`${item.response?.request_id || item.label}`} className="list-group-item d-flex justify-content-between align-items-center p-1 small">
        {item.label} Status {statusIcon}
      </li>
    );
  })}
</ul>

              {/* Button */}
              <div className="text-end mt-2">
                <button className="btn btn-outline-primary btn-sm w-100">
                  <Link href={`/employers-dashboard/list-verified-employee/details?id=${candidate._id}`}>
                    <Eye size={14} className="me-1" /> View Application
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
