import React from "react";
import { CheckCircle, XCircle, HelpCircle, Eye } from "lucide-react";
import Link from "next/link";

const UsersList = ({ users }) => {
  return (
    <div className="container mt-4">
      {users.length > 0 && (
        <div className="result-container">
          <h3>Search Results:</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Phone</th>
                <th>PAN Status</th>
                <th>Aadhar Status</th>
                <th>Voter Status</th>
                <th>License Status</th>
                <th>Passport Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((candidate, index) => (
                <tr key={candidate._id || `user-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{candidate.candidate_name}</strong>
                  </td>
                  <td>{candidate.candidate_mobile}</td>

                  {/* Mapping over status responses */}
                  {[
                    { label: "PAN", response: candidate.pan_response },
                    { label: "Aadhar", response: candidate.aadhar_response },
                    { label: "Voter", response: candidate.epic_response },
                    { label: "License", response: candidate.dl_response },
                    {
                      label: "Passport",
                      response: candidate.passport_response,
                    },
                  ].map((item, idx) => (
                    <td key={`${candidate._id}-${item.label}`}>
                      {renderStatusIcon(item.response)}
                    </td>
                  ))}

                  <td>
                    <Link
                      href={`/employers-dashboard/list-verified-employee/details?id=${candidate._id}`}
                    >
                      <button className="btn btn-outline-primary btn-sm w-100">
                        <Eye size={14} className="me-1" /> View Application
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Function to render status icons
const renderStatusIcon = (response) => {
  if (response?.response_code === "100") {
    return (
      <CheckCircle
        size={14}
        className="text-success"
        title="Valid Authentication"
      />
    );
  }
  if (response?.response_code === "101") {
    return (
      <XCircle
        size={14}
        className="text-danger"
        title="Invalid Authentication"
      />
    );
  }
  return <HelpCircle size={14} className="text-warning" title="Not Applied" />;
};

export default UsersList;
