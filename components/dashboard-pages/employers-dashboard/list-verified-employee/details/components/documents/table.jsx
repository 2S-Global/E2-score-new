import React from "react";
import { BadgeAlert, BadgeCheck, FileText } from "lucide-react";

export const DocumentsTable = ({ user , handleclick  }) => {
  return (
    <div className="table-responsive"> {/* Makes table scrollable on small screens */}
      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ minWidth: "200px" }}>Candidate Name</th>
            <th style={{ minWidth: "100px" }}>PAN</th>
            <th style={{ minWidth: "100px" }}>Passport</th>
            <th style={{ minWidth: "100px" }}>Aadhar</th>
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
              "aadhar_response",
              "dl_response",
              "epic_response",
            ].map((key, index) => (
                /* implement handleclick  */
              <td key={index} className="py-3">
                {user?.[key]?.response_code == 100 ? (
                  <BadgeCheck className="text-success" size={20} 
                  onClick={() => handleclick(key)}
                  />
                ) : (
                  <BadgeAlert className="text-warning" size={20} 
                  onClick={() => handleclick(key)}/>
                )}
              </td>
            ))}
            <td className="py-3">
              <FileText className="text-primary cursor-pointer" size={20} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
