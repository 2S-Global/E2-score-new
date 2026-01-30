"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const JobListingsTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState("");

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/jobposting/get_all_my_applied_job`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setAppliedJobs(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appliedJobs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No applied jobs found
                  </td>
                </tr>
              )}

              {appliedJobs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Image
                              width={50}
                              height={50}
                              src={
                                item.jobId?.companyLogo ||
                                "/images/default-logo.png"
                              }
                              alt="logo"
                            />
                          </span>
                          <h4>
                            <Link href={`/job-details/${item.jobId?._id}`}>
                              {item.jobId.jobTitle}
                            </Link>
                          </h4>

                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-money"></span>
                             {item.jobId.salary.currency} {item.jobId.salary.amount} {item.jobId.salary.rate}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                             <span style={{ textTransform: "capitalize" }}> {item.jobId.jobLocationType}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {new Date(item.appliedAt).toLocaleDateString()}
                  </td>

                  <td className={`status ${item.status}`}>
                   <span style={{
    textTransform: "capitalize",
    textDecoration: "none",
    fontWeight: "bold",
  }}> {item.status}</span>
                  </td>

                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <Link
                            href={`/job-details/${item.jobId._id}?view=candidate`}
                            data-text="View Application"
                          >
                            <span className="la la-eye"></span>
                          </Link>
                        </li>

{/*                         <li>
                          <button data-text="Withdraw Application">
                            <span className="la la-trash"></span>
                          </button>
                        </li> */}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {error && (
            <p className="text-danger text-center mt-3">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
