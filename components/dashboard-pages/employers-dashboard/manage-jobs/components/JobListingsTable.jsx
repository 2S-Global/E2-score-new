"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import { useState, useEffect } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg.jsx";

const JobListingsTable = () => {
  // Initialize route here
  const router = useRouter();

  // Error Variables
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const handleEdit = (jobId) => {
    router.push(`/employers-dashboard/post-jobs/edit/${jobId}`);
  };

  // Token
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  if (!token) {
    console.log("No token");
  }

  const [allJobListing, setAllJobListing] = useState([]);

const handleStatusToggle = async (job) => {
  // If already completed, do nothing (optional safety)
  if (job.status === "completed") return;

  try {
    setUpdatingJobId(job._id);

    const response = await axios.post(
      `${apiurl}/api/jobposting/confirm_job_posting_details`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          jobId: job._id,
        },
      },
    );

    if (!response.data.success) {
      alert(response.data.message || "Failed to update job status");
      return;
    }

    setSuccess("Job activated successfully");
    fetchAllJobListing(); // refresh table
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  } finally {
    setUpdatingJobId(null);
  }
};


  const fetchAllJobListing = async () => {
    // setLoading(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/jobposting/get_all_job_listing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        "Here is my all job listing data which is coming from useEffect !",
        response.data,
      );

      if (response.data.success && response.status === 200) {
        const job = response.data.data;
        setAllJobListing(job);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobListing();
  }, []);

  const handleDelete = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await axios.delete(
        `${apiurl}/api/jobposting/delete_job_posting`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { jobId },
        },
      );

      if (!response.data.success) {
        setError(response.data.message);
        setErrorId(Date.now());
        return;
      }

      setSuccess(response.data.message);

      // setSuccess("Candidate added successfully!");
      // alert("Job deleted successfully!");
      // Refresh the job list
      fetchAllJobListing();
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="tabs-box container-fluid px-0">
      <div className="widget-title d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">My Job Listings</h4>

        {/* <div className="chosen-outer">
          <select className="form-select form-select-sm w-auto">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div> */}
      </div>

      {/* Message Component Section */}
      <MessageComponent error={error} success={success} errorId={errorId} />

      {/* Responsive Table Section */}
      <div className="widget-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                {/* <th>Status</th> */}
                <th>Job Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-2">Loading job listings...</div>
                  </td>
                </tr>
              ) : allJobListing.length > 0 ? (
                allJobListing.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          width={50}
                          height={49}
                          src={job.logo || "/images/resource/no_user.png"}
                          alt="logo"
                        />
                        <div>
                          <small className="mb-1">
                            <Link
                              href={`/job-details/${job._id}?view=employer`}
                            >
                              {job.jobTitle}
                            </Link>
                          </small>
                          <br />
                          <small className="text-muted">
                            <i className="flaticon-briefcase me-1"></i>{" "}
                            {job.jobType?.join(", ")}
                            <br />
                            <i className="flaticon-map-locator me-1"></i>{" "}
                            {job.jobLocationType === "remote"
                              ? job.advertiseCityName
                                ? `Remote - ${job.advertiseCityName}`
                                : "Remote"
                              : job.location || "N/A"}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <small>N/A</small>
                    </td>
                    <td>
                      <small>{job.createdAt}</small>
                      <br />
                      <small>{job.expiryDate}</small>
                    </td>
                    {/* <td>
                      <span
                        className={`badge ${job.isActive ? "bg-success" : "bg-secondary"}`}
                      >
                        {job.isActive ? "Active" : "Inactive"}
                      </span>
                    </td> */}
                    <td>
                      <div
                        className={`form-check form-switch d-flex align-items-center ${
                          job.status === "completed"
                            ? "opacity-80"
                            : "opacity-40"
                        }`}
                        style={{
                          cursor:
                            updatingJobId === job._id ||
                            job.status === "completed"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={job.status === "completed"}
                          disabled={
                            updatingJobId === job._id ||
                            job.status === "completed"
                          }
                          onChange={() => handleStatusToggle(job)}
                          style={{
                            cursor:
                              updatingJobId === job._id ||
                              job.status === "completed"
                                ? "not-allowed"
                                : "pointer",
                          }}
                        />

                        <label
                          className="form-check-label ms-2"
                          style={{
                            cursor:
                              updatingJobId === job._id ||
                              job.status === "completed"
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {updatingJobId === job._id ? (
                            <span className="spinner-border spinner-border-sm text-primary"></span>
                          ) : job.status === "completed" ? (
                            <span className="text-success fw-bold">
                              Active
                            </span>
                          ) : (
                            <span className="text-warning fw-semibold">
                              Draft
                            </span>
                          )}
                        </label>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            router.push(`/job-details/${job._id}?view=employer`)
                          }
                        >
                          <i className="la la-eye"></i>
                        </button>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleEdit(job._id)}
                        >
                          <i className="la la-pencil"></i>
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(job._id)}
                        >
                          <i className="la la-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No job listings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
