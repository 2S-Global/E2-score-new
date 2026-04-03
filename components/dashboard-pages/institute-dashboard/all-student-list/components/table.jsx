"use client";
import React, { useMemo, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil, Eye, FileDown } from "lucide-react";

const Companytable = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);

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
    const token = localStorage.getItem("Institute_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/institutestudent/get_all_students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      //setError("Error fetching companies. Please try again.");
      // setErrorId(Date.now());
    } finally {
      setLoading(false);
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
      width: "55px",
      center: true,
    },

    // ✅ NEW PHOTO COLUMN ADDED HERE
    {
      name: "Photo",
      selector: (row) => row.photo,
      center: true,
      width: "100px",
      cell: (row) => (
        <img
          width={50}
          height={50}
          src={
            row.photo || "/images/resource/no_user.png" // fallback
          }
          alt="candidate"
          className=" "
          style={{ objectFit: "cover" }}
        />
      ),
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
      cell: (row) => (
        <div
          title={row.email}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.email}
        </div>
      ),
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      center: true,
      cell: (row) => (
        <div
          title={row.details}
          style={{
            maxWidth: "140px",
          }}
        >
          {row.details}
        </div>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Eye
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(
                `/candidates-details/${row.userId}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
            size={20}
          />
        </div>
      ),
      center: true,
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
    </>
  );
};

export default Companytable;
