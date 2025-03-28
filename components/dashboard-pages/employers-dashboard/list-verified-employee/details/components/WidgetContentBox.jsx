import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, MapPin } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const WidgetContentBox = () => {
  const [userid, setUserid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  // Extract user ID on the client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUserid(params.get("id"));
    }
  }, []);

  // API call
  useEffect(() => {
    if (!userid) return; // Avoid making a request if there's no user ID

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${apiurl}/api/verify/verifiedDetails`, {
          id: userid, // Send in req.body
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userid, apiurl]);

  // Handle null user case
  const userData = user
    ? [
      { label: "Name", value: user.candidate_name || "" },
      { label: "Email", value: user.candidate_email || "" },
      { label: "Address", value: user.candidate_address || "" },
      { label: "Phone Number", value: user.candidate_mobile || "" },
      { label: "Date of Birth", value: user.candidate_dob || "" },
    ]
    : [];

  return (
    <div className="widget-content p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-3 text-primary">User Information</h4>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && user && (
        <>
          <form className="default-form">
            <div className="row">
              {userData.map((field, index) => (
                <div key={index} className="form-group col-md-4 mb-3">
                  <label className="fw-bold">{field.label}</label>
                  <input type="text" className="form-control" value={field.value} readOnly />
                </div>
              ))}
            </div>
          </form>

          <div className="row">
            <h4 className="text-primary mb-3">Verification Details</h4>
            {/* PAN */}
            {
              user?.pan_response && (

                <div className="col-md-4 mb-4">

                  <div className="p-3 shadow-sm rounded bg-light">
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
              )
            }

            {/* adhare */}
            {
              user?.aadhar_response && (
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
              )
            }



            {/* Epic */}
            {
              user?.epic_response && (
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
              )
            }
            {/* dl */}
            {
              user?.dl_response && (
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
              )
            }
            {/* passport */}
            {
              user?.passport_response && (
                <div className="col-md-4 mb-4">
                  <div className="p-3 shadow-sm rounded bg-light"> {/* Simple box with padding and background */}
                    <h5 className="fw-bold text-dark mb-2">Passport</h5>
                    <div className="mt-2">
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">Full Name:</span>
                        <span className="text-break">{user?.passport_response.result.name_on_passport}</span>
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
              )
            }




          </div>
        </>














      )}
    </div>
  );
};

export default WidgetContentBox;
