"use client";
import React, { useMemo, useEffect, useState } from "react";

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
 const [apply, setApply] = useState(false);
  // 🔎 Filter data based on search text
/*   const filteredStudent = useMemo(() => {
    return students.filter((data) => {
      const search = searchText.toLowerCase();
      return (
        data.name?.toLowerCase().includes(search) ||
        data.admissionYear?.toLowerCase().includes(search) ||
        data.program?.toLowerCase().includes(search) ||
        data.USN?.toLowerCase().includes(search) ||
        String(data.tenTh)?.toLowerCase().includes(search) ||
        String(data.twelveTh)?.toLowerCase().includes(search) ||
        data.email?.toLowerCase().includes(search)
      );
    });
  }, [students, searchText]); */


   const [filters, setFilters] = useState({
    usn: "",
    name: "",
    course: "",
    minAge: "",
    maxAge: "",
    min10: "",
    max10: "",
    min12: "",
    max12: "",
    minYear: "",
    maxYear: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
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
      min10: "",
      max10: "",
      min12: "",
      max12: "",
      minYear: "",
      maxYear: "",
      year: "",
    });
     setApply(false);
  };

   // ⚡ Optimized filtering using useMemo
  const filteredData = useMemo(() => {
     if (!apply) return students;
    return students.filter(row => {

      // 🔥 Early exit (faster filtering)
      if (filters.course && row.course !== filters.course) return false;
      if (filters.year && row.admissionYear !== Number(filters.year)) return false;

      if (filters.minAge && row.age < Number(filters.minAge)) return false;
      if (filters.maxAge && row.age > Number(filters.maxAge)) return false;

      if (filters.min10 && row.tenTh < Number(filters.min10)) return false;
      if (filters.max10 && row.tenTh > Number(filters.max10)) return false;

      if (filters.min12 && row.twelveTh < Number(filters.min12)) return false;
      if (filters.max12 && row.twelveTh > Number(filters.max12)) return false;

      if (filters.minYear && row.admissionYear < Number(filters.minYear)) return false;
      if (filters.maxYear && row.admissionYear > Number(filters.maxYear)) return false;

      // 🔍 Text search (kept last)
      if (filters.usn && !row.USN.toLowerCase().includes(filters.usn.toLowerCase())) return false;
      if (filters.name && !row.name.toLowerCase().includes(filters.name.toLowerCase())) return false;

      return true;
    });
  }, [filters,apply]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "55px",
      center: true,
      sortable: false,
    },
    {
      name: "Candidate Name",
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
      selector: (row) => row?.programDetails?.name||"",
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row?.programDetails?.name||""} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row?.programDetails?.name ||""}
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
     <div className="row g-2 mb-3">

        <div className="col-md-2">
          <input className="form-control" name="usn" placeholder="USN" value={filters.usn} onChange={handleChange} />
        </div>

        <div className="col-md-2">
          <input className="form-control" name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        </div>

        <div className="col-md-2">
          <select className="form-select" name="course" value={filters.course} onChange={handleChange}>
            <option value="">All Courses</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BSc">BSc</option>
          </select>
        </div>

        <div className="col-md-1">
          <input className="form-control" name="min12" placeholder="12th Min" value={filters.min12} onChange={handleChange} />
        </div>

        <div className="col-md-1">
          <input className="form-control" name="max12" placeholder="12th Max" value={filters.max12} onChange={handleChange} />
        </div>

        <div className="col-md-1">
          <input className="form-control" name="min10" placeholder="10th Min" value={filters.min10} onChange={handleChange} />
        </div>

        <div className="col-md-1">
          <input className="form-control" name="max10" placeholder="10th Max" value={filters.max10} onChange={handleChange} />
        </div>

        <div className="col-md-1">
          <input className="form-control" name="minYear" placeholder="Admission Year Min" value={filters.minYear} onChange={handleChange} />
        </div>

        <div className="col-md-1">
          <input className="form-control" name="maxYear" placeholder="Admission Year  Max" value={filters.maxYear} onChange={handleChange} />
        </div>

        {/* Buttons */}
        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={() => setApply(true)}>
            Search
          </button>

          <button className="btn btn-secondary w-100" onClick={resetFilters}>
            Reset
          </button>
        </div>

      </div>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              dense
              fixedHeader
              subHeader
             
              customStyles={{
                table: {
                  style: {
                    borderRadius: "5px",
                    overflow: "hidden",
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  },
                },
                rows: {
                  style: {
                    minHeight: "58px",
                    borderBottom: "1px solid #f3f3f3",
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f9fafb",
                    },
                  },
                },
                head: {
                  style: {
                    borderBottom: "2px solid #e5e5e5",
                  },
                },
                headCells: {
                  style: {
                    backgroundColor: "#f8f9fa",
                    fontWeight: "700",
                    fontSize: "10px",
                    color: "#343a40",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    borderBottom: "1px solid #dee2e6",
                    borderRight: "1px solid #e0e0e0",
                  },
                },
                cells: {
                  style: {
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#212529",
                    lineHeight: "1.5",
                    borderRight: "1px solid #e0e0e0",
                  },
                },
                pagination: {
                  style: {
                    borderTop: "1px solid #dee2e6",
                    padding: "10px 20px",
                  },
                  pageButtonsStyle: {
                    borderRadius: "5px",
                    height: "35px",
                    width: "35px",
                    padding: "6px",
                    margin: "2px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover:not(:disabled)": {
                      backgroundColor: "#46b171",
                      color: "#fff",
                    },
                    "&:focus": {
                      outline: "none",
                      backgroundColor: "#46b171",
                      color: "#fff",
                    },
                  },
                },
                subHeader: {
                  style: {
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #f1f1f1",
                    padding: "10px 15px",
                  },
                },
              }}
            />
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
