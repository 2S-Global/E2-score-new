import React from "react";

const AdharDetails = ({ user }) => {
    return (
        <div className="col-md-4 mb-4">
                  <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0 me-2">Aadhaar</h5>
                      {user?.aadhaar_response?.response_code === "100" ? (
                    <img
                        src="/images/resource/verified.png"
                        alt="Verified"
                        style={{ width: "100px", height: "20px" }}
                    />
                    ) : (
                        <img
                            src="/images/resource/unverified.png"
                            alt="Not Verified"
                            style={{ width: "100px", height: "20px" }}
                        />
                    )}  
                </div>
                    <div className="mt-2">
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">Aadhaar Number:</span>
                        <span className="text-break">{ user?.aadhaar_response?.result?.user_aadhaar_number ||  "N/A"}</span>
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">State:</span>
                        <span className="text-break">{user?.aadhaar_response?.result?.state || "N/A"}</span>
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">Gender:</span>
                        <span className="text-break">{user?.aadhaar_response?.result?.user_gender || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

    );
};
export default AdharDetails;
