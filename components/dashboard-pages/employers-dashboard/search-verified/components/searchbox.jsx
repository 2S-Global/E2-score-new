import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import Link from "next/link";
import { MapPin, CheckCircle, XCircle, Eye, HelpCircle } from "lucide-react";
const SearchBox = () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("Admin_token");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!searchQuery.trim()) {
            setError("Search query cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${apiurl}/api/verify/searchUserVerifiedList`,
                { keyword: searchQuery },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.users && response.data.users.length > 0) {
                setUsers(response.data.users);
                setSuccess("Results found!");
            } else {
                setUsers([]);
                setError("No results found.");
            }
        } catch (err) {
            setError("An error occurred while searching.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="widget-content">
            <div className="row">
                <form className="default-form" onSubmit={handleSubmit}>
                    <MessageComponent error={error} success={success} />
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="form-group col-md-4 text-center">
                            <input
                                type="text"
                                name="listing-search"
                                placeholder="Name, keywords, Email or Phone Number"
                                className="form-control text-center"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                required
                            />
                            <span
                                className="icon flaticon-search-3"
                                onClick={handleSubmit}
                                style={{ cursor: "pointer", marginLeft: "10px" }}
                            ></span>
                        </div>
                    </div>
                </form>
                {users.length > 0 && (
                    <div className="result-container">
                        <h3>Search Results:</h3>
                        <ul>
                            {users.map((candidate) => (
                                <div key={candidate.id} className="col-md-6 mb-3">
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
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
