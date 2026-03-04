"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  addCategory,
  addDatePosted,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
  addTag,
  clearExperience,
  clearJobType,
} from "../../../features/filter/filterSlice";

import {
  clearDatePostToggle,
  clearExperienceToggle,
  clearJobTypeToggle,
} from "../../../features/job/jobSlice";

const FilterJobsBox = () => {
  const dispatch = useDispatch();

  const { jobList, jobSort } = useSelector((state) => state.filter);
  const { keyword, location, tag, jobType, datePosted, experience } =
    jobList || {};
  const { sort } = jobSort;

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  const [allJobs, setAllJobs] = useState([]);
  const [error, setError] = useState(null);

  /* ======================
     PAGINATION STATE
  ====================== */
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [bookmarkLoading, setBookmarkLoading] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  /* ======================
     FETCH JOBS
  ====================== */
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/candidate/joblisting/get_all_job_list`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          setAllJobs(response.data.data);

          // ✅ Initialize savedJobs from backend
          const initialSavedJobs = {};
          response.data.data.forEach((job) => {
            initialSavedJobs[job._id] = job.isBookmarked;
          });
          setSavedJobs(initialSavedJobs);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllJobs();
  }, []);

  const handleBookmark = async (jobId) => {
    if (!token) return;

    setBookmarkLoading((prev) => ({ ...prev, [jobId]: true }));

    try {
      if (savedJobs[jobId]) {
        // 🔴 REMOVE saved job
        await axios.post(
          `${apiurl}/api/candidate/joblisting/remove_saved_job`,
          { savedJobId: jobId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // ❌ Remove from state
        setSavedJobs((prev) => ({
          ...prev,
          [jobId]: false,
        }));
      } else {
        // 🟢 SAVE job
        await axios.post(
          `${apiurl}/api/candidate/joblisting/save_job`,
          { jobId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // ✅ Mark as saved
        setSavedJobs((prev) => ({ ...prev, [jobId]: true }));
      }
    } catch (error) {
      console.error("Bookmark toggle failed", error);
    } finally {
      setBookmarkLoading((prev) => ({ ...prev, [jobId]: false }));
    }
  };

  /* ======================
     FILTERS (UNCHANGED)
  ====================== */
  const keywordFilter = (item) => {
    if (!keyword) return true;

    const search = keyword.trim().toLowerCase();

    return (
      item.jobTitle?.toLowerCase().includes(search) ||
      item.companyName?.toLowerCase().includes(search) ||
      item.location?.toLowerCase().includes(search) ||
      item.jobExperienceLevel?.toLowerCase().includes(search) ||
      item.jobType?.some((type) => type.toLowerCase().includes(search))
    );
  };

  const locationFilter = (item) =>
    location
      ? item.location?.toLowerCase().includes(location.toLowerCase())
      : true;

  const tagFilter = (item) => (tag ? item.tag === tag : true);

  const jobTypeFilter = (item) => {
    if (!jobType?.length) return true;

    return item.jobType?.some((type) => jobType.includes(type));
  };

  const experienceFilter = (item) => {
    if (!experience || !experience.length) return true;

    return experience.some((exp) =>
      item.jobExperienceLevel?.toLowerCase().includes(exp.toLowerCase()),
    );
  };

  const datePostedFilter = (item) => {
    if (!datePosted || datePosted === "all") return true;

    const now = new Date();
    const jobDate = new Date(item.createdDate);
    const diffMs = now - jobDate;

    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    switch (datePosted) {
      case "last-hour":
        return diffHours <= 1;

      case "last-24-hour":
        return diffHours <= 24;

      case "last-7-days":
        return diffDays <= 7;

      case "last-14-days":
        return diffDays <= 14;

      case "last-30-days":
        return diffDays <= 30;

      default:
        return true;
    }
  };

  const sortFilter = (a, b) => {
    // Default: latest first
    if (!sort || sort === "des") {
      return new Date(b.createdDate) - new Date(a.createdDate);
    }

    // Oldest first
    if (sort === "asc") {
      return new Date(a.createdDate) - new Date(b.createdDate);
    }

    return 0;
  };

  const filteredJobs = allJobs
    .filter(keywordFilter)
    .filter(experienceFilter)
    .filter(jobTypeFilter)
    .filter(datePostedFilter)
    .filter(tagFilter)
    .sort(sortFilter);

  /* ======================
     PAGINATION LOGIC
  ====================== */
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* ======================
     RESET PAGE ON FILTER CHANGE
  ====================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location, tag, sort, datePosted]);

  /* ======================
     SAME UI (UNCHANGED)
  ====================== */
  let content = paginatedJobs.map((item) => (
    <div className="job-block" key={item._id}>
      <div className="inner-box">
        <div className="content">
          <span className="company-logo">
            <Image
              width={50}
              height={49}
              src={item.logo || "/images/resource/no_user.png"}
              alt="Company Logo"
            />
          </span>

          <h4 style={{ marginBottom: "5px" }}>
            <Link href={`/job-details/${item._id}?view=candidate`}>
              {item.jobTitle}
            </Link>
          </h4>

          <h6 style={{ fontSize: "13px", marginBottom: "12px" }}>
            {item.companyName}
          </h6>

          <ul className="job-info">
            {item.jobExperienceLevel && (
              <li>
                <span className="icon flaticon-briefcase"></span>
                {item.jobExperienceLevel}
              </li>
            )}

            <li>
              <span className="icon flaticon-money"></span>
              {item.salary?.currency}
              {item.salary?.amount ||
                `${item.salary?.min} - ${item.salary?.max}`}
            </li>

            {item.location && (
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item.jobLocationType === "remote" ? "Remote" : item.location}
              </li>
            )}

            {item.createdAgo && (
              <li>
                <span className="icon flaticon-clock-3"></span>{" "}
                {item.createdAgo}
              </li>
            )}
          </ul>

          <ul className="job-other-info">
            {Array.isArray(item.jobType) &&
              item.jobType.map((type, index) => (
                <li key={index} className="time">
                  {type}
                </li>
              ))}
          </ul>

          <button
            className="bookmark-btn"
            disabled={bookmarkLoading[item._id]}
            onClick={() => handleBookmark(item._id)}
          >
            {bookmarkLoading[item._id] ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <i
                className={
                  savedJobs[item._id]
                    ? "fa-solid fa-bookmark"
                    : "fa-regular fa-bookmark"
                }
                style={{
                  color: savedJobs[item._id] ? "#000" : "#666",
                  fontSize: "16px",
                  transition: "0.2s ease",
                }}
              ></i>
            )}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <style jsx>{`
        .no-job-found {
          background: #f9fafb;
          border-radius: 12px;
        }

        .empty-state-box h4 {
          font-weight: 600;
        }

        .empty-state-box p {
          font-size: 14px;
        }
      `}</style>
      {error && <p className="text-danger">{error}</p>}

      <div className="showing-result mb-3 d-lg-none">
        <button
          type="button"
          className="theme-btn toggle-filters"
          data-bs-toggle="offcanvas"
          data-bs-target="#filter-sidebar"
        >
          <span className="icon icon-filter"></span> Filter
        </button>
      </div>
      {paginatedJobs.length === 0 ? (
        <div className="no-job-found text-center py-5">
          <div className="empty-state-box">
            <h4 className="mt-4">No Jobs Found</h4>

            <p className="text-muted mb-4">
              We couldn’t find any jobs matching your search criteria.
              <br />
              Try adjusting your filters or search keyword.
            </p>

            <button
              className="theme-btn btn-style-one"
              onClick={() => {
                dispatch(clearJobType());
                dispatch(clearExperience());
                dispatch(addKeyword(""));
                dispatch(addLocation(""));
                dispatch(addDatePosted("all"));
                dispatch(addTag(""));
                dispatch(clearJobTypeToggle()); // 👈 ADD THIS
                dispatch(clearExperienceToggle()); // 👈 ADD THIS
                dispatch(clearDatePostToggle());
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        content
      )}
      {/* ================= PAGINATION UI ================= */}
      {totalPages > 1 && paginatedJobs.length > 0 && (
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
    </>
  );
};

export default FilterJobsBox;
