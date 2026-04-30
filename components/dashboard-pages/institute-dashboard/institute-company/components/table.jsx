"use client";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil, Eye, FileDown } from "lucide-react";
import AddFormModal from "./modals/AddFormModal";
import ViewModal from "./modals/viewModal";
import "rc-slider/assets/index.css";
const Table = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [edit, setEdit] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const openModalRH = (data) => {
    setEdit(data);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
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
        `${apiurl}/api/instituteprofile/get_all_companies_by_institute`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setCompany(response.data.data);
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



  const [searchText, setSearchText] = useState("");

  // 🔎 Filter data based on search text
  const filteredData = useMemo(() => {
    return company.filter((item) => {
      const search = searchText.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search)||
        item.contactPerson?.toLowerCase().includes(search)||
        item.phone?.toLowerCase().includes(search)
      );
    });
  }, [company, searchText]);

  // ⚡ Optimized filtering using useMemo



  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "55px",
      center: true,
      sortable: false,
    },
    {
      name: "Company Name",
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
      cell: (row) => (
        <div
          title={row.email} // ✅ native tooltip on hover
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
      name: "Contact Person",
      selector: (row) => row.USN,
      sortable: true,
      center: true,
      cell: (row) => (
        <div
          title={row.contactPerson}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row.contactPerson}
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row?.phone || "",
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row?.phone || ""} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "140px",
          }}
        >
          {row?.phone || ""}
        </div>
      ),
    },
   /*  {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "",
      center: true,
      cell: (row) => (
        <div
          title={row.address} // ✅ native tooltip on hover
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "240px",
            cursor:"pointer"
          }}
        >
          {row.address}
        </div>
      ),
    }, */
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
              <DataTable
                columns={columns}
                data={filteredData}
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
                  onChange={(e) => setSearchText(e.target.value)}
                />
              }
              />
          
          </div>
        </div>
      )}

  {isModalOpen && (
        <ViewModal
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
