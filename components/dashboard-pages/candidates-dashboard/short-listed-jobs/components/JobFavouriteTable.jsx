"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const JobFavouriteTable = () => {
  const [jobs, setJobs] = useState([]);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  /* ======================
     REMOVE SAVED JOB
  ====================== */
const handleRemoveSavedJob = async (jobId) => {
  if (!token) return;

  try {
    await axios.post(
      `${apiurl}/api/candidate/joblisting/remove_saved_job`,
      { savedJobId: jobId }, // backend expects jobId here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setJobs((prev) => prev.filter((item) => item.job._id !== jobId));
  } catch (error) {
    console.error("Failed to remove saved job", error);
  }
};

  /* ======================
     FETCH JOBS
  ====================== */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${apiurl}/api/candidate/joblisting/get_saved_job`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setJobs(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load jobs", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title"></div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Post Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((item) => {
                  const job = item.job;

                  return (
                    <tr key={item.savedJobId}>
                      <td>
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <Image
                                  width={48}
                                  height={48}
                                  src={
                                    job.logo || "/images/resource/no_user.png"
                                  }
                                  alt="logo"
                                />
                              </span>

                              <h4>
                                <Link
                                  href={`/job-details/${job._id}?view=candidate`}
                                >
                                  {job.jobTitle}
                                </Link>
                              </h4>

                              <ul className="job-other-info">
                                {Array.isArray(job.jobType) &&
                                  job.jobType.map((type, index) => (
                                    <li key={index} className="time">
                                      {type}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        {new Date(job.createdAt).toLocaleDateString("en-GB", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </td>

                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                data-text="Remove Saved Job"
                                onClick={() =>
                                  handleRemoveSavedJob(item.job._id)
                                }
                              >
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No saved jobs found
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

export default JobFavouriteTable;
