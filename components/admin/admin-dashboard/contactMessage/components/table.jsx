"use client";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";
import ViewModal from "./modals/viewModal";
const Table = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);
 const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const openModalRH = (details) => {
    setEditData(details);
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
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/home/list-contact-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.data?.length>0) {
        setData(response.data.data);
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



  const [searchText, setSearchText] = useState("");

  // 🔎 Filter data based on search text
  const filtered = useMemo(() => {
    return Data.filter((item) => {
      const search = searchText.toLowerCase();
      return (
        item.name?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search)||
        item.subject?.toLowerCase().includes(search)||
        item.message?.toLowerCase().includes(search)
      );
    });
  }, [Data, searchText]);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "55px",
      center: true,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "",
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "",
      center: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (      
      <div
          title={row.subject}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.subject}
        </div>
      ),
    },
  {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      width: "",
      center: true,
       cell: (row) => (
       
      <div
         title={row.message}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.message}
        </div>
   
        
      ),
    },
     {
      name: "Action",
      cell: (row) => (
        <div className="d-flex  gap-2">

          <Eye
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => openModalRH(row)}
            size={20}
          />
          
        </div>
      ),
      center: true,
      width: "150px",
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
                    fontSize: "15px",
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

        <ViewModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editData}
          refresh={refresh}
          setRefresh={setRefresh}
          data={editData}
        />
      )}
    </>
  );
};

export default Table;
