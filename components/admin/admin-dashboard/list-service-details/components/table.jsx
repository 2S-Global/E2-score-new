"use client";
import React, { useMemo, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil, Eye, FileDown, PackageOpen } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import EditplanModal from "./modals/planmodal";
import VerifiedlistModal from "./modals/verifiedlistModal";
import CandidateformModal from "./modals/formmodal";
import CircularProgress from "@mui/material/CircularProgress";
import { se } from "date-fns/locale/se";
import { set } from "date-fns/set";

const Companytable = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingid, setDownloadingid] = useState(null);
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
      setErrorId(Date.now());
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/home/get-service-details`,
      );

      if (response.data.success) {
        setCompanies(response.data.data);
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
    // console.log("Delete ID:", id);
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      const response = await axios.put(
        `${apiurl}/api/home/delete-service-details/${id}`,
        {},
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

  const [searchText, setSearchText] = useState("");

  // 🔎 Filter data based on search text
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const search = searchText.toLowerCase();
      return (
        company.title?.toLowerCase().includes(search) ||
        company.description?.toLowerCase().includes(search) ||
        (company.is_active ? "active" : "inactive").includes(search)
      );
    });
  }, [companies, searchText]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "55px",
      center: "true",
      sortable: false,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "",
      center: "true",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "",
      center: "true",
      // cell: (row) => (
      //   <div
      //     title={row.email} // ✅ native tooltip on hover
      //     style={{
      //       whiteSpace: "nowrap",
      //       overflow: "hidden",
      //       textOverflow: "ellipsis",
      //       maxWidth: "140px",
      //     }}
      //   >
      //     {row.description}
      //   </div>
      // ),
      cell: (row) => {
        const plainText = row.description
          ?.replace(/<[^>]+>/g, "") // remove HTML tags
          .trim();

        return (
          <div
            title={plainText}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "140px",
            }}
          >
            {plainText}
          </div>
        );
      }
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
      center: "true",
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex  gap-2">
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
                "Are you sure you want to delete this service?",
              );
              if (confirmDelete) handleDelete(row._id);
            }}
          />
        </div>
      ),
      center: "true",
      width: "80px",
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
                    fontSize: "10px",
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
        /*   <EditfieldModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editcompany}
          refresh={refresh}
          setRefresh={setRefresh}
        /> */
        <CandidateformModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editcompany}
          refresh={refresh}
          setRefresh={setRefresh}
          data={editcompany}
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
