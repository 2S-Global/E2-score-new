"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CopyrightFooter from "../../CopyrightFooter";
import axios from "axios";

const index = () => {
    const params = useParams();
    const jobId = params.jobId;
    console.log("Here is my Job Id present : ", jobId);

    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("employer_token");
    if (!token) {
        console.log("No token");
    }

    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    console.log("after assigining dob details in data variables using setData :", data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setLoading(true);
                // setError(null);
                console.log("Component mounted successfully in review job page !");
                const response = await axios.get(
                    `${apiurl}/api/jobposting/get_job_posting_details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            jobId: jobId,
                            status: "draft",
                        },
                    }
                );
                console.log("Fetched job posting data ggkl:", response.data);
                if (response.data.success && response.status === 200 && response.data) {
                    setData(response.data.data);
                } else {
                    console.warn("No valid response data found:", response);
                }
                // setData(response.data.data);
            } catch (err) {
                console.log("I am in catch block ! ");
                console.error("Error fetching job posting data:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                // setLoading(false);
                console.log("I am in finally block ! ");
            }
        };

        fetchData();
    }, []); // Empty dependency array → runs once on mount


    return (
        <>
            <div className="review-container">
                <h1 className="review-title">Review</h1>
                <div className="job-details">
                    <h2>Job details</h2>

                    <div className="detail-row">
                        <div className="detail-label">Job title</div>
                        <div className="detail-value">
                            {data?.jobTitle || "N/A"}   {/* 👈 render dynamic job title */}
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    {data?.companyName && (
                        <div className="detail-row">
                            <div className="detail-label">Company for this job</div>
                            <div className="detail-value">
                                {data.companyName}
                                <span className="edit-icon">&#9998;</span>
                            </div>
                        </div>
                    )}

                    {data?.positionAvailable && (
                        <div className="detail-row">
                            <div className="detail-label">Number of openings</div>
                            <div className="detail-value">
                                {data.positionAvailable}
                                <span className="edit-icon">&#9998;</span>
                            </div>
                        </div>
                    )}

                    {data?.country && (
                        <div className="detail-row">
                            <div className="detail-label">Country</div>
                            <div className="detail-value">
                                {/* {data.country.name} */}
                                {typeof data.country === "object" ? data.country.name : data.country}
                                <span className="edit-icon">&#9998;</span>
                            </div>
                        </div>
                    )}

                    <div className="detail-row">
                        <div className="detail-label">City</div>
                        <div className="detail-value">
                            Kolkata
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Branch</div>
                        <div className="detail-value">
                            2S Global Technologies Limited Kolkata
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Complete Address</div>
                        <div className="detail-value">
                            108, Webel IT Park (Phase-II),DH Block, Action Area 1D, New Town,Kolkata-700160
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Job Type</div>
                        <div className="detail-value">
                            Full-time, Part-time, Internship, Fresher, Contract
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Expected hours per week</div>
                        <div className="detail-value">
                            9
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Contract length</div>
                        <div className="detail-value">
                            6 months
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Pay</div>
                        <div className="detail-value">
                            ₹1,82,850.13 - ₹11,13,106.08 per year
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Benefits</div>
                        <div className="detail-value">
                            Health insurance, Provident Fund
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">Job description</div>
                        <div className="detail-value">
                            We want highly motivated and skilled developer
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <hr className="divider" />

                    <h2>Settings</h2>

                    <div className="detail-row">
                        <div className="detail-label">Application method</div>
                        <div className="detail-value">
                            Email
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Require resume</div>
                        <div className="detail-value">
                            Yes
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Application updates</div>
                        <div className="detail-value">
                            chandra@2sglobal.us
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Hiring timeline</div>
                        <div className="detail-value">
                            2 to 4 weeks
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>

                    <hr className="divider" />

                    <h2>Account</h2>

                    <div className="detail-row">
                        <div className="detail-label">Contact</div>
                        <div className="detail-value">
                            Chandra Sarkar
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Phone number</div>
                        <div className="detail-value">
                            8001357669
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Your company name</div>
                        <div className="detail-value">
                            2S Global Technologies Limited
                            <span className="edit-icon">&#9998;</span>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <div>
                        <button className="btn back-btn">← Back</button>
                    </div>
                    <div className="right-buttons">
                        <button className="btn preview-btn">
                            Preview <span className="arrow">›</span>
                        </button>
                        <button className="btn confirm-btn">
                            Confirm <span className="eye">👁</span>
                        </button>
                    </div>
                </div>
            </div>

            <CopyrightFooter />

            {/* CSS inside same file */}
            <style jsx>{`
        body {
          background: #fff;
          font-family: 'Segoe UI', Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        .review-container {
          max-width: 650px;
          margin: 60px auto 0 auto;
          padding: 40px 30px 0 30px;
        }

        .review-title {
          font-size: 3em;
          font-weight: 700;
          margin-bottom: 40px;
          color: #222;
        }

        .job-details h2 {
          font-size: 1.2em;
          font-weight: 600;
          margin-bottom: 24px;
          color: #363636;
        }

        .detail-row {
          display: flex;
          align-items: center;
          margin-bottom: 28px;
        }

        .detail-label {
          min-width: 210px;
          font-size: 1em;
          color: #222;
          font-weight: 500;
        }

        .detail-value {
          font-size: 1em;
          color: #525252;
          display: flex;
          align-items: center;
          margin-left: 32px;
        }

        .edit-icon {
          margin-left: 16px;
          color: #176be6;
          cursor: pointer;
          font-size: 1.1em;
        }
        .divider {
            border: none;
            border-top: 1px solid #6d6969ff;
            margin: 30px 0;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 55px;
          margin-bottom: 32px;
        }
        .right-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 16px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-btn {
          background: #fff;
          border: 1px solid #ccc;
          color: #176be6;
        }
        .back-btn:hover {
          border-color: #176be6;
          background: #f7f9ff;
        }

        .preview-btn {
          background: #fff;
          border: 1px solid #ccc;
          color: #176be6;
        }
        .preview-btn:hover {
          border-color: #176be6;
          background: #f7f9ff;
        }

        .confirm-btn {
          background: #176be6;
          color: #fff;
        }
        .confirm-btn:hover {
          background: #0f4fb3;
        }

        .arrow {
          margin-left: 6px;
        }

        .eye {
          margin-left: 6px;
          font-size: 0.9em;
        }
      `}</style>
        </>
    );
};

export default index;