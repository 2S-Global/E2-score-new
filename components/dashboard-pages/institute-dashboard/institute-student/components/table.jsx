"use client";
import React, { useMemo, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil, Eye, FileDown } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import EditplanModal from "./modals/planmodal";
import VerifiedlistModal from "./modals/verifiedlistModal";
import CandidateformModal from "./modals/formmodal";
import AddFormModal from "./modals/AddFormModal";
import CircularProgress from "@mui/material/CircularProgress";
import { se } from "date-fns/locale/se";
import { set } from "date-fns/set";
import Slider from "rc-slider";
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
    const [selectProgram, setSelectProgram] = useState([])
   const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/companyRoutes/delete-students`,
        { companyId: id, role: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setRefresh(true);
        setSuccess(response.data.message);
        setMessage_id(Date.now());
      } else {
        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (err) {
      setError("Error deleting company. Please try again.");
      setErrorId(Date.now());
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("Super_token");

    // console.log("Token:", token);
    // console.log("ID:", id);
    // console.log("Current Status:", currentStatus);

    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/companyRoutes/togglestatus-students`,
        {
          companyId: id,
          status: !currentStatus,
          role: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setStudents((prev) =>
          prev.map((comp) =>
            comp._id === id ? { ...comp, is_active: !currentStatus } : comp,
          ),
        );
        setSuccess(response.data.message);
        setMessage_id(Date.now());
      } else {
        setError("Failed to toggle status.");
        setErrorId(Date.now());
      }
    } catch (error) {
      setError("Something went wrong while toggling status.");
      setErrorId(Date.now());
    }
  };

  const handleDownload = async (id, name = "user") => {
    setDownloading(true);
    setDownloadingid(id);
    try {
      const token = localStorage.getItem("Super_token");
      if (!token) {
        setError("Token not found. Please log in again.");
        setErrorId(Date.now());
        return;
      }

      const response = await axios({
        url: `${apiurl}/api/candidate/resume/get_resume_admin`,
        method: "GET",
        params: { userId: id },
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);

      if (error.response) {
        // Server responded with an error status
        setError(
          `Download failed: ${error.response.data.message || "Server error"}`,
        );
        setErrorId(Date.now());
      } else if (error.request) {
        // Request made but no response received
        setError("No response from server. Please try again later.");
        setErrorId(Date.now());
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
        setErrorId(Date.now());
      }
    } finally {
      setDownloading(false);
      setDownloadingid(null);
    }
  };

  const [searchText, setSearchText] = useState("");

 // course list
  
  useEffect(()=>{
     const token = localStorage.getItem("Institute_token");
     const fetchData = async () => {
              try {
                    const response = await axios.get( `${apiurl}/api/institute-course/course`,   {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                  
                  const responseData = response?.data?.data.map((item) => ({
                                      label: item?.type!=='custom'?item?.name+'('+item?.type+')':item?.name,
                                      value: item?._id,
                                    }));
                    setProgramData(responseData ||[])
                    
              } catch (error) {
                console.error(error);
              }
            };
     
           
        fetchData()
  },[])

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
  setFilters({
    usn: "",
    name: "",
    course: "",
    minAge: "",
    maxAge: "",
    min10: 0,
    max10: 100,
    min12: 0,
    max12: 100,
    admissionYear: "",
  });
   setSelectProgram([])
};

  // ⚡ Optimized filtering using useMemo

  const isFilterApplied =
    filters.usn ||
    filters.name ||
    filters.course ||
    filters.admissionYear ||
    filters.min10 !== 0 ||
    filters.max10 !== 100 ||
    filters.min12 !== 0 ||
    filters.max12 !== 100;

      const handleProgramSelect = (selectedOptions) => {
  setFilters((prev) => ({ ...prev, course: selectedOptions?.value }));
      setSelectProgram(selectedOptions);
  };
const filteredData = useMemo(() => {
  // ❌ No filter → return empty
  if (!isFilterApplied) return [];

  return students.filter((row) => {
    if (filters.course && row.program !== filters.course) return false;

    if (filters.admissionYear && row.admissionYear !== filters.admissionYear)
      return false;

    if (filters.min10 && row.tenTh < Number(filters.min10)) return false;
    if (filters.max10 && row.tenTh > Number(filters.max10)) return false;

    if (filters.min12 && row.twelveTh < Number(filters.min12)) return false;
    if (filters.max12 && row.twelveTh > Number(filters.max12)) return false;

    if (
      filters.usn &&
      !row.USN.toLowerCase().includes(filters.usn.toLowerCase())
    )
      return false;

    if (
      filters.name &&
      !row.name.toLowerCase().includes(filters.name.toLowerCase())
    )
      return false;

    return true;
  });
}, [filters, students]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "55px",
      center: true,
      sortable: false,
    },
    {
      name: "Student Name",
      selector: (row) => row.name,
      sortable: true,
      width: "",
      center: true,
    },
    {
      name: "Admission Year",
      selector: (row) => row.admissionYear,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row.admissionYear} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.admissionYear}
        </div>
      ),
    },
    {
      name: "USN",
      selector: (row) => row.USN,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row.USN} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.USN}
        </div>
      ),
    },
    {
      name: "Program",
      selector: (row) => row?.programDetails?.name || "",
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row?.programDetails?.name || ""} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row?.programDetails?.name || ""}
        </div>
      ),
    },
    {
      name: "10th(%)",
      selector: (row) => row.tenTh,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row.tenTh} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.tenTh}
        </div>
      ),
    },
    {
      name: "12th(%)",
      selector: (row) => row.twelveTh,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row.twelveTh} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.twelveTh}
        </div>
      ),
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="d-flex justify-content-center gap-2">
          <Eye
            size={18}
            style={{ cursor: "pointer", color: "#0d6efd" }}
            title="View"
            onClick={() => openModalRH(row)} // 👈 open your modal
          />
          <Pencil
            size={18}
            style={{ cursor: "pointer", color: "#0d6efd" }}
            title="View"
            onClick={() => openModalEdit(row)} // 👈 open your modal
          />
        </div>
      ),
    },
  ];

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
                      {/* USN */}
                      <div className="col-md-3">
                        <label className="form-label">USN</label>
                        <input
                          className="form-control"
                          name="usn"
                          value={filters.usn}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Name */}
                      <div className="col-md-3">
                        <label className="form-label">Name</label>
                        <input
                          className="form-control"
                          name="name"
                          value={filters.name}
                          onChange={handleChange}
                        />
                      </div>

                       <div className="col-md-3">
                        <label className="form-label"> Admission Year</label>
                        
                            <select
                              className="form-select"
                              name="admissionYear"
                              value={filters.admissionYear}
                              onChange={handleChange}
                            >
                              <option value="">Select Year</option>
                              {years?.map((year) => (
                              <option key={year}>{year}</option>
                            ))}
                            </select>
                      </div>

                      {/* Course */}
                      <div className="col-md-3">
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

                     

                      {/* 10th Slider */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          10th % ({filters.min10} - {filters.max10})
                        </label>

                        <Slider
                          range
                          min={0}
                          max={100}
                          value={[filters.min10, filters.max10]}
                          onChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              min10: value[0],
                              max10: value[1],
                            }))
                          }
                        />
                      </div>

                      {/* 12th Slider */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          12th % ({filters.min12} - {filters.max12})
                        </label>

                        <Slider
                          range
                          min={0}
                          max={100}
                          value={[filters.min12, filters.max12]}
                          onChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              min12: value[0],
                              max12: value[1],
                            }))
                          }
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {isFilterApplied ? (
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                dense
                fixedHeader
                subHeader
            
              />
            ) : (
              <div className="text-center py-4 text-muted">
                🔍 Please apply filters to see results
              </div>
            )}
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

      {isEditModalOpen && (
        <AddFormModal
          show={isEditModalOpen}
          onClose={closeModalEdit}
          field={edit}
          refresh={refresh}
          setRefresh={setRefresh}
          data={edit}
        />
      )}

      {/* {isModalvlOpen && (
        <VerifiedlistModal
          show={isModalvlOpen}
          onClose={closeModalVL}
          company={edit}
        />
      )} */}
    </>
  );
};

export default Table;
