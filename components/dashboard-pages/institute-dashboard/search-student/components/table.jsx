"use client";
import React, { useMemo, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil, Eye, FileDown } from "lucide-react";

import CandidateformModal from "./modals/formmodal";

import "rc-slider/assets/index.css";
const Table = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingid, setDownloadingid] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [edit, setEdit] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalplanOpen, setIsModalplanOpen] = useState(false);
  const [isModalvlOpen, setIsModalvlOpen] = useState(false);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [programData, setProgramData] = useState([]);
 const [selectProgram, setSelectProgram] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const router = useRouter();
  const openModalRH = (data) => {
    setEdit(data);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalVL = () => {
    setIsModalvlOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
    console.log("close modal verified list");
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const closeModalPlanRH = () => {
    setIsModalplanOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
    console.log("close modal plan");
  };
  //edit modal
  const openModalEdit = (data) => {
    setEdit(data);
    setIsEditModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
  const closeModalEdit = () => {
    setIsEditModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  useEffect(() => {
    fetchStudents();
  }, [apiurl]);

  useEffect(() => {
    if (refresh) {
      fetchStudents();
      setRefresh(false);
    }
  }, [refresh]);

  const fetchStudents = async () => {
    const token = localStorage.getItem("Institute_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/institutestudent/institute-student-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setStudents(response.data.data);
        //  setSuccess(response.data.message);
        // setMessage_id(Date.now());
      } else {
        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (err) {
      setError("Error fetching students. Please try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  const [searchText, setSearchText] = useState("");

  // course list

  useEffect(() => {
    const token = localStorage.getItem("Institute_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/institute-course/course`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const responseData = response?.data?.data.map((item) => ({
          label:
            item?.type !== "custom"
              ? item?.name + "(" + item?.type + ")"
              : item?.name,
          value: item?._id,
          totalSem: Number(item?.total_number_of_semesters || 0),
          structure: item?.courseStructure || "semester",
        }));
        setProgramData(responseData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [filters, setFilters] = useState({
    usn: "",
    name: "",
    course: "",
    minAge: "",
    maxAge: "",
    min10: 0,
    max10: 100,
    min12: 0,
    max12: 100,
    admissionYear: "", // ✅ FIXED
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const resetFilters = () => {
  setSelectProgram(null);
  setSelectedSemester(null);
  setSemesterOptions([]);
};

const handleSearch = () => {
  // ❌ validation
  if (!selectProgram) {
    setError("Program is required");
    setErrorId(Date.now());
    return;
  }

  if (!selectedSemester) {
    setError("Semester is required");
    setErrorId(Date.now());
    return;
  }

  // ✅ proceed if valid
  const query = new URLSearchParams();
  query.append("course", selectProgram.value);
  query.append("semester", selectedSemester.value);

  router.push(`/institute-dashboard/search-details?${query.toString()}`);
};

  const handleProgramSelect = (selectedOption) => {
    setSelectProgram(selectedOption);

    setFilters((prev) => ({
      ...prev,
      course: selectedOption?.value || "",
    }));

    // 🔥 Generate semesters dynamically
    if (selectedOption?.totalSem) {
      const sems = Array.from({ length: selectedOption.totalSem }, (_, i) => ({
        label:
          selectedOption.structure === "year"
            ? `${i + 1}` // keep year if needed
            : `${i + 1}`, // 🔥 ONLY number
        value: i + 1,
      }));

      setSemesterOptions(sems);
    } else {
      setSemesterOptions([]);
    }

    setSelectedSemester(null); // reset
  };

  const handleSemesterSelect = (option) => {
    setSelectedSemester(option);

    setFilters((prev) => ({
      ...prev,
      semester: option?.value || "",
    }));
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        message_id={message_id}
        errorId={errorId}
      />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="widget-content">
          <div className="table-wrapper">
            {/* 🔍 Filters */}
            <div className="accordion mb-3" id="filterAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterCollapse"
                  >
                    🔍 Filter Students
                  </button>
                </h2>

                <div
                  id="filterCollapse"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body px-4 py-3">
                    <div className="row g-4">
                      {/* Course */}
                      <div className="col-md-6">
                        <label className="form-label">Program</label>
                        <Select
                          options={programData}
                          value={selectProgram}
                          onChange={handleProgramSelect}
                          placeholder="Please select"
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Semester</label>
                        <Select
                          options={semesterOptions}
                          value={selectedSemester}
                          onChange={handleSemesterSelect}
                          placeholder="Select Semester"
                          isDisabled={!selectProgram}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>

                      {/* Buttons */}
                      <hr className="mt-4 mb-3" />

                      <div className="d-flex justify-content-start gap-2">
                        <button
                          className="btn btn-outline-secondary px-4"
                          onClick={resetFilters}
                        >
                          Reset
                        </button>

                        <button
                          className="btn btn-primary px-4"
                          onClick={handleSearch}
                          disabled={!selectProgram || !selectedSemester}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CandidateformModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={edit}
          refresh={refresh}
          setRefresh={setRefresh}
          data={edit}
        />
      )}
    </>
  );
};

export default Table;
