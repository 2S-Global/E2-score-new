"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const JobFavouriteTable = () => {
  /* ======================
     STATE
  ====================== */
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

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
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedJobs.map((item) => {
                const job = item.job; // ✅ IMPORTANT

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
                                src={job.logo || "/images/resource/no_user.png"}
                                alt="logo"
                              />
                            </span>

                            <h4>
                              <Link href={`/job-details/${job._id}`}>
                                {job.jobTitle}
                              </Link>
                            </h4>

                            {/* SIDE-BY-SIDE INLINE CSS (UNCHANGED) */}
                            <ul
                              className="job-info"
                              style={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center",
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              <li
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="icon flaticon-briefcase"
                                  style={{ marginRight: "6px" }}
                                ></span>
                                {Array.isArray(job.jobType)
                                  ? job.jobType.join(", ")
                                  : "—"}
                              </li>

                              <li
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="icon flaticon-map-locator"
                                  style={{ marginRight: "6px" }}
                                ></span>
                                {job.jobLocationType === "remote"
                                  ? "Remote"
                                  : job.address || "—"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Saved date instead of createdAgo */}
                    <td>{new Date(item.savedAt).toLocaleDateString()}</td>
                    <td className="status">Saved</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Remove Saved Job">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ======================
             PAGINATION  
          ====================== */}
          {totalPages > 1 && (
            <div className="ls-pagination mt-4 text-center">
              <button
                className="btn btn-sm btn-light"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn btn-sm mx-1 ${
                    currentPage === index + 1 ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="btn btn-sm btn-light"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFavouriteTable;
