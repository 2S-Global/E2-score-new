import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import Link from "next/link";
import { MapPin, CheckCircle, XCircle, Eye } from "lucide-react";
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
                            {users.map((user) => (
                                <li key={user._id}>
                                    <strong>Name:</strong> {user.candidate_name} <br />
                                    <strong>Email:</strong> {user.candidate_email} <br />
                                    <strong>Mobile:</strong> {user.candidate_mobile}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
