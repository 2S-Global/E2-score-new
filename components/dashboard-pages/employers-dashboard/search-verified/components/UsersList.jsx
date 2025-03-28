import React from "react";
import { CheckCircle, XCircle, HelpCircle, Eye } from "lucide-react";
import Link from "next/link";
const UsersList = ({ users }) => {





    return (
        <>
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
                                    <tr key={candidate.id || index}>
                                        <td>{index + 1}</td> {/* Serial Number */}
                                        <td><strong>{candidate.candidate_name}</strong></td> {/* Fixed key */}
                                        <td>{candidate.candidate_mobile}</td> {/* Fixed key */}
                                        {/* Mapping over status responses */}
                                        {[
                                            { label: "PAN", response: candidate.pan_response },
                                            { label: "Aadhar", response: candidate.aadhar_response },
                                            { label: "Voter", response: candidate.epic_response },
                                            { label: "License", response: candidate.dl_response },
                                            { label: "Passport", response: candidate.passport_response },
                                        ].map((item, idx) => (
                                            <td key={idx}>{renderStatusIcon(item.response)}</td>
                                        ))}
                                        <td>
                                            <Link href={`/employers-dashboard/list-verified-employee/details?id=${candidate._id}`}>
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








            <div className="row">
                <h4 className="text-primary mb-3">Verification Details</h4>
                <div className="col-md-4 mb-4">
                    <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                        <h5 className="fw-bold text-dark mb-2">PAN</h5>
                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Full Name:</span>
                                <span className="text-break">Avik Ghosh</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Number:</span>
                                <span className="text-break">AMPPG7969P</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Type:</span>
                                <span className="text-break">Person</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Verified:</span>
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Address:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">Lueilwitz, Wisoky and Leuschke</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                        <h5 className="fw-bold text-dark mb-2">AADHAAR</h5>
                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Full Name:</span>
                                <span className="text-break">Avik Ghosh</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">DOB:</span>
                                <span className="text-break">20-08-1985</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Gender:</span>
                                <span className="text-break">Male</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Verified:</span>
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Address:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">Lueilwitz, Wisoky and Leuschke</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                        <h5 className="fw-bold text-dark mb-2">EPIC</h5>
                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Full Name:</span>
                                <span className="text-break">Avik Ghosh</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">EPIC:</span>
                                <span className="text-break">KTF2559334</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Verified:</span>
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Constituency Name:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">Rajarhat New Town</span>
                            </div>

                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Address:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">Lueilwitz, Wisoky and Leuschke</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                        <h5 className="fw-bold text-dark mb-2">DL</h5>
                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Full Name:</span>
                                <span className="text-break">Avik Ghosh</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">DL Number:</span>
                                <span className="text-break">KTF2559334</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Verified:</span>
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Cover:</span>
                                <span className="text-break">LMV</span>
                            </div>

                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Expiry Date:</span>
                                <span className="text-break">06-03-2033</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                        <h5 className="fw-bold text-dark mb-2">Passport</h5>
                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Full Name:</span>
                                <span className="text-break">Avik Ghosh</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Passport Number:</span>
                                <span className="text-break">KTF2559334</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Verified:</span>
                                <CheckCircle size={16} className="text-success" />
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Country:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">India</span>
                            </div>

                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">Address:</span>
                                <MapPin size={16} className="me-1" />
                                <span className="text-break">Lueilwitz, Wisoky and Leuschke</span>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </>
    );
};
// Function to render status icons
const renderStatusIcon = (response) => {
    if (response) {
        if (response.response_code === "100") {
            return <CheckCircle size={14} className="text-success" title="Valid Authentication" />;
        } else if (response.response_code === "101") {
            return <XCircle size={14} className="text-danger" title="Invalid Authentication" />;
        }
    }
    return <HelpCircle size={14} className="text-warning" title="Not Applied" />;
};


export default UsersList;
