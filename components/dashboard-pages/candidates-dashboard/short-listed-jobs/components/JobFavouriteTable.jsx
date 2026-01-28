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
  const MAX_PAGES_TO_SHOW = 10;

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

  /* ======================
     PAGINATION RANGE
  ====================== */
  const startPage =
    Math.floor((currentPage - 1) / MAX_PAGES_TO_SHOW) * MAX_PAGES_TO_SHOW + 1;

  const endPage = Math.min(startPage + MAX_PAGES_TO_SHOW - 1, totalPages);

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
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((item) => {
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
                                <Link href={`/job-details/${job._id}`}>
                                  {job.jobTitle}
                                </Link>
                              </h4>

                              <ul className="job-other-info">
                                {Array.isArray(job.jobType) &&
                                job.jobType.length > 0 ? (
                                  job.jobType.map((type, index) => (
                                    <li key={index} className="time">
                                     
                                      {type}
                                    </li>
                                  ))
                                ) : (
                                  ""
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        {new Date(item.job.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            timeZone: "Asia/Kolkata",
                          },
                        )}
                      </td>

                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            {/* <li>
                              <button data-text="View Job">
                                <span className="la la-eye"></span>
                              </button>
                            </li> */}
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
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No saved jobs found
                  </td>
                </tr>
              )}
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

              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i,
              ).map((page) => (
                <button
                  key={page}
                  className={`btn btn-sm mx-1 ${
                    currentPage === page ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
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
