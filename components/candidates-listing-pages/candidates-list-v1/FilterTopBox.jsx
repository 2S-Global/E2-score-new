"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

import {
  addCandidateGender,
  addCategory,
  addDatePost,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
  clearExperienceF,
  clearQualificationF,
} from "../../../features/filter/candidateFilterSlice";
import {
  clearDatePost,
  clearExperience,
  clearQualification,
} from "../../../features/candidate/candidateSlice";

const FilterTopBox = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const employerToken =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

  const {
    keyword,
    location,
    destination,
    category,
    candidateGender,
    datePost,
    experiences,
    qualifications,
    sort,
    perPage,
  } = useSelector((state) => state.candidateFilter) || {};

  const dispatch = useDispatch();

  // ✅ Fetch Candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/candidate/candidateDetails/get_all_candidates`,
          {
            headers: {
              Authorization: `Bearer ${employerToken}`,
            },
          },
        );

        if (res.data?.success) {
          setCandidatesData(res.data.data);
        } else {
          setCandidatesData([]);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setCandidatesData([]);
      } finally {
        setLoading(false);
      }
    };

    if (employerToken) {
      fetchCandidates();
    }
  }, [employerToken]);

  // ================= FILTERS =================

const keywordFilter = (item) => {
  if (!keyword) return true;

  const search = keyword.toLowerCase();

  return (
    item?.name?.toLowerCase().includes(search) ||
    item?.email?.toLowerCase().includes(search) ||
    item?.phone_number?.toLowerCase().includes(search)
  );
};

  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : true;

  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLowerCase() === category?.toLowerCase()
      : true;

  const genderFilter = (item) =>
    candidateGender !== ""
      ? item?.gender?.toLowerCase() === candidateGender.toLowerCase()
      : true;

  const sortFilter = (a, b) => (sort === "des" ? b.id - a.id : a.id - b.id);

  const filteredData = candidatesData
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(categoryFilter)
    ?.filter(genderFilter)
    ?.sort(sortFilter);

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .btn-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .view-btn {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          background: #f5f5f5;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s ease;
        }

        .view-btn:hover {
          background: #1967d2;
          color: #fff;
        }
      `}</style>

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

      {filteredData?.length === 0 && (
        <div className="text-center py-4">
          <p>No candidates found.</p>
        </div>
      )}

      {filteredData?.map((candidate) => (
        <div className="candidate-block-three" key={candidate._id}>
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <Image
                  width={90}
                  height={90}
                  src={candidate.profilePicture || "/images/default-avatar.png"}
                  alt="candidate"
                />
              </figure>

              <h4 className="name">
                <Link
                  href={`/candidates-details/${candidate._id}`}
                  target="_blank"
                >
                  {candidate.name}
                </Link>
              </h4>

              {/* ✅ Static Designation + Location + Salary */}
              <ul className="candidate-info">
                <li className="designation">Software Developer</li>
                <li>
                  <span className="icon flaticon-map-locator"></span> Kolkata,
                  India
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $ 25 / hour
                </li>
                <li>
                  <span className="icon flaticon-email"></span>{" "}
                  {candidate.email}
                </li>
              </ul>

              {/* ✅ Static Tags */}
              <ul className="post-tags">
                <li>
                  <a href="#">React</a>
                </li>
                <li>
                  <a href="#">Node.js</a>
                </li>
                <li>
                  <a href="#">MongoDB</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilterTopBox;
