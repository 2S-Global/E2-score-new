"use client";

import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  addKeyword,
  addGender,
  addAdmissionYear,
  setMarksRange,
  clearInstituteFilter,
  setExclude,
} from "../../../features/filter/filterInstitute";

const FilterJobsBox = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const course = searchParams.get("course");
  const semester = Number(searchParams.get("semester"));
  const { studentList } = useSelector((state) => state.filterInstitute);
  const { keyword, gender, admissionYear, marks, exclude } = studentList;
  const dispatch = useDispatch();
  const keywordFilter = (item) =>
    keyword !== ""
      ? item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.USN.toLowerCase().includes(keyword.toLowerCase())
      : true;
  const genderMap = {
    m: "male",
    f: "female",
    o: "other",
  };

  const genderFilter = (item) =>
    gender.length
      ? gender.includes(genderMap[item.gender] || item.gender)
      : true;

  const admissionYearFilter = (item) =>
    admissionYear !== "" ? item.admissionYear === admissionYear : true;

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // change as needed

  const marksFilter = (item) =>
    item.tenTh >= marks.tenth[0] &&
    item.tenTh <= marks.tenth[1] &&
    item.twelveTh >= marks.twelfth[0] &&
    item.twelveTh <= marks.twelfth[1] &&
    item.graduationMarks >= marks.graduation[0] &&
    item.graduationMarks <= marks.graduation[1];

  const handleSendInterview = (student) => {
    console.log("Send to interview:", student);

    // Example API call
    // axios.post("/api/send-interview", student)

    alert(`${student.name} sent for interview`);
  };

  const excludeFilter = (item) => {
    // ❌ exclude interview given students
    if (exclude.interview && item.attendInterview > 0) {
      return false;
    }

    // ❌ exclude placed students
    if (exclude.placed && item.placement > 0) {
      return false;
    }

    return true;
  };
  const filteredStudents = students
    .filter(keywordFilter)
    .filter(genderFilter)
    .filter(admissionYearFilter)
    .filter(marksFilter)
    .filter(excludeFilter);

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);

      // ✅ get token from localStorage
      const token = localStorage.getItem("Institute_token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/institutestudent/institute-student-search`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
          params: {
            course,
            semester,
          },
        },
      );

      setStudents(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDOB = (dob) => {
    if (!dob) return "-";

    const date = new Date(dob);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    if (course && semester) {
      fetchStudents();
    }
  }, [course, semester]);

  let content = currentStudents.map((item) => (
    <div className="job-block" key={item._id}>
      <div className="inner-box">
        <div className="content" style={{ paddingLeft: "0px" }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            {/* 👤 Name */}
            <h4 className="mb-0">{item.name?.toUpperCase()}</h4>

            {/* 🔘 Buttons */}
            <div className="d-flex gap-3 align-items-center ms-5">
              <Link href={`/student/${item.id}`}>
                <i className="fas fa-eye action-icon" title="View Details"></i>
              </Link>

              <i
                className="fas fa-paper-plane action-icon text-success"
                title="Send for Interview"
                onClick={() => handleSendInterview(item)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>

          <div className="d-flex align-items-start flex-wrap gap-3">
            <ul className="job-info mb-0">
              {/* <li>
                <span className="icon flaticon-user"></span>
                <span className="label">Program:</span>{" "}
                {item.programDetails?.name}
              </li> */}

              <li>
                <span className="icon flaticon-user"></span>
                <span className="label">DOB:</span> {formatDOB(item.dob)}
              </li>
              <li>
                <span className="icon flaticon-user"></span>
                <span className="label">Gender:</span>{" "}
                {item.gender.toUpperCase()}
              </li>
              <li>
                <span className="icon flaticon-user"></span>
                <span className="label">Admission Year:</span>{" "}
                {item.admissionYear}
              </li>
            </ul>

            <ul className="job-other-info mb-0">
              <li className="time">10th: {item.tenTh}%</li>
              <li className="privacy">12th: {item.twelveTh}%</li>
              <li className="required">Graduation: {item.graduationMarks}%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));

  // sort handler

  // clear all filters
  const clearAll = () => {
    dispatch(clearInstituteFilter());
  };

  const hasActiveFilters =
    keyword !== "" ||
    gender.length !== 0 ||
    admissionYear !== "" ||
    marks.tenth[0] !== 0 ||
    marks.tenth[1] !== 100 ||
    marks.twelfth[0] !== 0 ||
    marks.twelfth[1] !== 100 ||
    marks.graduation[0] !== 0 ||
    marks.graduation[1] !== 100 ||
    Object.values(exclude || {}).some(Boolean); // ✅ FIX
  return (
    <>
      <div className="ls-switcher">
        <div className="show-result">
          <div className="show-1023">
            <button
              type="button"
              className="theme-btn toggle-filters "
              data-bs-toggle="offcanvas"
              data-bs-target="#filter-sidebar"
            >
              <span className="icon icon-filter"></span> Filter
            </button>
          </div>

          <div className="text">
            Showing <strong>{currentStudents.length}</strong> of{" "}
            <strong>{filteredStudents.length}</strong> students
          </div>
        </div>

        <div className="sort-by">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* ✅ Student List */}
      {content}

      {/* ✅ Pagination UI (MOVED HERE) */}
      <div className="pagination-area mt-4 text-center flex-wrap d-flex justify-content-center">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Prev
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="mx-2">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`btn me-1 ${
                currentPage === page ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ),
        )}

        <button
          className="btn btn-outline-secondary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>

      <>
        {/* your existing JSX */}

        <style jsx global>{`
          @media only screen and (max-width: 599px) {
            .job-block .job-other-info {
              margin-top: 0px !important;
              margin-left: 0px !important;
            }
          }
          .pagination-area {
            flex-wrap: wrap;
            gap: 5px;
          }

          .pagination-area button {
            min-width: 40px;
          }
        `}</style>
      </>
    </>
  );
};

export default FilterJobsBox;
