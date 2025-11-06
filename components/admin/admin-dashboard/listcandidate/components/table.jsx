"use client";
import React, { useMemo, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import {
  Trash2,
  Settings,
  Pencil,
  PackageOpen,
  Send,
  FilePen,
  Mailbox,
  ShoppingCart,
  Eye,
  FileDown,
} from "lucide-react";
import EditfieldModal from "./modals/editfield";
import EditplanModal from "./modals/planmodal";
import VerifiedlistModal from "./modals/verifiedlistModal";

const Companytable = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [editcompany, setEditcompany] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalplanOpen, setIsModalplanOpen] = useState(false);
  const [isModalvlOpen, setIsModalvlOpen] = useState(false);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const [emailloading, setEmailloading] = useState(false);
  const openModalRH = (companydetails) => {
    setEditcompany(companydetails);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
  const openModalPlanRH = (companydetails) => {
    setEditcompany(companydetails);
    setIsModalplanOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
    console.log("open modal plan");
  };
  const openModalVL = (companydetails) => {
    setEditcompany(companydetails);
    setIsModalvlOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
    console.log("open modal verified list");
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
  const handlecart = (company) => {
    router.push(`/admin/cart?id=${company._id}`);
  };

  useEffect(() => {
    fetchCompanies();
  }, [apiurl]);

  useEffect(() => {
    if (refresh) {
      fetchCompanies();
      setRefresh(false);
    }
  }, [refresh]);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiurl}/api/companyRoutes/list-companies`,
        { role: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies(response.data.data);
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error fetching companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/companyRoutes/delete-companies`,
        { companyId: id, role: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // setCompanies((prev) => prev.filter((company) => company._id !== id));
        setRefresh(true);
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error deleting company. Please try again.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("Super_token");

    // console.log("Token:", token);
    // console.log("ID:", id);
    // console.log("Current Status:", currentStatus);

    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/companyRoutes/togglestatus-companies`,
        {
          companyId: id,
          status: !currentStatus,
          role: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies((prev) =>
          prev.map((comp) =>
            comp._id === id ? { ...comp, is_active: !currentStatus } : comp
          )
        );
        setSuccess(response.data.message);
      } else {
        setError("Failed to toggle status.");
      }
    } catch (error) {
      setError("Something went wrong while toggling status.");
    }
  };

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("Super_token");
      if (!token) {
        setError("Token not found. Please log in again.");
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
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);

      if (error.response) {
        // Server responded with an error status
        setError(
          `Download failed: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {
        // Request made but no response received
        setError("No response from server. Please try again later.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const [searchText, setSearchText] = useState("");

  // 🔎 Filter data based on search text
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const search = searchText.toLowerCase();
      return (
        company.name?.toLowerCase().includes(search) ||
        company.email?.toLowerCase().includes(search) ||
        (company.is_active ? "active" : "inactive").includes(search)
      );
    });
  }, [companies, searchText]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "Candidate Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Candidate Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Candidate Status",
      cell: (row) => (
        <div className="form-check form-switch d-flex justify-content-center ">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={row.is_active}
            onChange={() => toggleStatus(row._id, row.is_active)}
          />
          <label
            className={`form-check-label ms-2 fw-semibold ${
              row.is_active ? "text-success" : "text-danger"
            }`}
          >
            {row.is_active ? "Active" : "Inactive"}
          </label>
        </div>
      ),
      center: true,
    },
    {
      name: "Created Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-center gap-3">
          <Eye
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(
                `/candidates-details/${row._id}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
            size={20}
          />
          <FileDown
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleDownload(row._id)}
            size={20}
          />
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
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this candidate?"
              );
              if (confirmDelete) handleDelete(row._id);
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
          <div className="row">
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={filteredCompanies}
                pagination
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
                    onChange={(e) => setSearchText(e.target.value)} // ✅ Live filtering
                  />
                }
              />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditfieldModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editcompany}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}

      {isModalplanOpen && (
        <EditplanModal
          show={isModalplanOpen}
          onClose={closeModalPlanRH}
          field={editcompany}
        />
      )}

      {isModalvlOpen && (
        <VerifiedlistModal
          show={isModalvlOpen}
          onClose={closeModalVL}
          company={editcompany}
        />
      )}
    </>
  );
};

export default Companytable;
