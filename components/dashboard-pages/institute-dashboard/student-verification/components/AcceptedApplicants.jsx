"use client";

import Link from "next/link";
import Modal from "./modal";
import { useState, useEffect } from "react";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import axios from "axios";

const Applicants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessageId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [can_id, setCanId] = useState(null);
  const [employmentId, setEmploymentId] = useState(null);
  const [token, setToken] = useState(null);

  //pagination & search
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(null);
  const itemsPerPage = 5; // change as needed


  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("Institute_token"));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [token, apiurl]);

  // ✅ Search filter
  const filteredData = candidatesData.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(text) ||
      item.email?.toLowerCase().includes(text) ||
      item.details?.toLowerCase().includes(text) 
    );
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }
}, [filteredData, totalPages]);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/institutestudent/get_students_by_status`,
        {
            params: {
            status: "verified",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCandidatesData(response.data.data);
      }
    } catch (error) {
      // setError("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const openModalRH = (id, empId) => {
    setIsModalOpen(true);
    setCanId(id);
    setEmploymentId(empId);

    document.body.style.overflow = "hidden";
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    fetchData();
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <CustomizedProgressBars />
        </div>
      )}

      <div>               
                  {/* 🔝 Header + Search */}
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h5 className="mb-0 fw-semibold">Verified Students</h5>

                    <div style={{ minWidth: "210px" }}>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search..."
                        value={search}
                        style={{ height: "40px" }}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>

                  {/* 📊 Table */}
                  <div className="table-responsive rounded shadow-sm">
                    <table className="table align-middle table-hover mb-0 text-center">
                      <thead className="bg-light">
                        <tr className="text-secondary small">
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Details</th>
                          <th>Status</th>
                          <th>View</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredData.length > 0 ? (
                          currentItems.map((candidate, index) => (
                            <tr key={candidate.employmentId}>
                              <td className="text-muted">
                                {indexOfFirstItem + index + 1}
                              </td>

                              {/* 🖼 Image */}
                              <td>
                                <img
                                  src={candidate.photo || "/images/resource/no_user.png"}
                                  className="rounded-circle border"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                  onError={(e) =>
                                    (e.target.src = "/images/resource/no_user.png")
                                  }
                                />
                              </td>

                              {/* 👤 Name */}
                              <td>
                                <Link
                                  href={`/candidates-details/${candidate.userId}`}
                                  className="fw-semibold text-dark text-decoration-none"
                                >
                                  {candidate.name}
                                </Link>
                              </td>

                                  {/* Email */}
                                <td className="text-muted small">{candidate.email}</td>

                                {/* details */}
                                <td className="text-muted small">{candidate.details}</td>

                              {/* ✅ Status */}
                              <td>
                                <span
                                style={{textTransform: 'capitalize'}}
                                  className={`badge ${
                                    candidate.status === "verified"
                                      ? "bg-success-subtle text-success"
                                      : candidate.status === "unverified"
                                        ? "bg-warning-subtle text-warning"
                                        : "bg-danger-subtle text-danger"
                                  }`}
                                >
                                  {candidate.status}
                                </span>
                              </td>

                              {/* 👁 View */}
                              <td>
                                <button
                                  className="btn btn-sm btn-light border"
                                  title="View"
                                  onClick={() =>
                                    openModalRH(
                                      candidate.userId,
                                      candidate.employmentId,
                                      candidate.status,
                                    )
                                  }
                                >
                                  <i className="la la-eye text-primary"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                              No candidates found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>               
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Prev
                      </button>

                      {getPageNumbers().map((page) => (
                        <button
                          key={page}
                          className={`btn btn-sm ${
                            currentPage === page ? "btn-primary" : "btn-outline-primary"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
      </div>

      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={closeModalRH}
          can_id={can_id}
          emp_id={employmentId}
          setSuccess={setSuccess}
          setError={setError}
          setErrorId={setErrorId}
          setMessageId={setMessageId}
          is_complete={true}
        />
      )}
    </>
  );
};

export default Applicants;
