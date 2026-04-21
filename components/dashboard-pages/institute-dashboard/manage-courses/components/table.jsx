"use client";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil } from "lucide-react";
import CourseformModal from "./modals/formmodal";
import Image from "next/image";

const Testimonialtable = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const openModalRH = (Testimonialdetails) => {
    setEditTestimonial(Testimonialdetails);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  useEffect(() => {
    fetchData();
  }, [apiurl]);

  useEffect(() => {
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  const fetchData = async () => {
    const token = localStorage.getItem("Institute_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/institute-course/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.data?.length > 0) {
        setTestimonials(response.data.data);
        //  setSuccess(response.data.message);
        // setMessage_id(Date.now());
      } else {
        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (err) {
      setError("Error fetching companies. Please try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Institute_token");

    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      const response = await axios.delete(
        `${apiurl}/api/institutestudent/delete-custom-course`,
        {
          data: { courseId: id }, // ✅ matches backend
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        // ✅ OPTION 1 (current way)
        setRefresh(true);

        // ✅ OPTION 2 (better UX ⚡ instant)
        // setTestimonials(prev => prev.filter(item => item._id !== id));

        setSuccess(response.data.message);
        setMessage_id(Date.now());
      } else {
        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setErrorId(Date.now());
    }
  };

  const [searchText, setSearchText] = useState("");

  // 🔎 Filter data based on search text
  const filtered = useMemo(() => {
    return testimonials.filter((item) => {
      const search = searchText.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.type?.toLowerCase().includes(search)
      );
    });
  }, [testimonials, searchText]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "60px",
      center: true,
    },
    {
      name: "Course Name",
      selector: (row) => row.name || "-",
      sortable: true,
      center: true,
    },

    {
      name: "Duration",
      selector: (row) => row.course_durartion || "-",
      center: true,
    },
    {
      name: "Exam Type",
      selector: (row) =>
        row.courseStructure === "semester"
          ? "Semester"
          : row.courseStructure === "year"
            ? "Yearly"
            : "-",
      center: true,
    },
    {
      name: "Marks Type",
      selector: (row) => (row.marksType ? row.marksType.toUpperCase() : "-"),
      center: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Pencil
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => openModalRH(row)}
            size={20}
          />
          <Trash2
            size={20}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (confirm("Delete this course?")) {
                handleDelete(row._id);
              }
            }}
          />
        </div>
      ),
      center: true,
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
            <DataTable
              columns={columns}
              data={filtered}
              pagination
              paginationPerPage={perPage}
              paginationRowsPerPageOptions={[10, 20, 50]}
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={(newPerPage, page) => {
                setPerPage(newPerPage);
                setCurrentPage(page);
              }}
              highlightOnHover
              dense
              fixedHeader
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control w-25"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              }
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
        <CourseformModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editTestimonial}
          refresh={refresh}
          setRefresh={setRefresh}
          data={editTestimonial}
        />
      )}
    </>
  );
};

export default Testimonialtable;
