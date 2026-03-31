"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";
import DataTable from "react-data-table-component";
import { Trash2, Pencil } from "lucide-react";
import ClientFormModal from "./modals/formmodal";
import Image from "next/image";

const ClientTable = ({ setRefresh, refresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editClient, setEditClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);

  // ✅ Modal
  const openModal = (data) => {
    setEditClient(data);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // ✅ Fetch data
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

      const response = await axios.get(`${apiurl}/api/clients/all-client`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data?.length > 0) {
        setClients(response.data.data);
      } else {
        setClients([]);
      }
    } catch (err) {
      setError("Error fetching clients.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("Super_token");

    if (!token) {
      setError("Token not found.");
      setErrorId(Date.now());
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/clients/delete-Client`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setMessage_id(Date.now());
        setRefresh(true);
      } else {
        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (err) {
      setError("Delete failed.");
      setErrorId(Date.now());
    }
  };

  // ✅ Columns
  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "70px",
      center: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
      center: true,
      cell: (row) => (
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #dee2e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f9fa",
          }}
        >
          {row?.image ? (
            <Image
              width={70}
              height={70}
              src={row.image}
              alt="Client"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <span style={{ fontSize: "12px" }}>No Image</span>
          )}
        </div>
      ),
    },
    {
      name: "URL",
      selector: (row) => row.url,
      cell: (row) => (
        <a
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0d6efd",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          {row.url}
        </a>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Pencil
            className="text-primary"
            style={{ cursor: "pointer" }}
            size={20}
            onClick={() => openModal(row)}
          />
          <Trash2
            className="text-danger"
            style={{ cursor: "pointer" }}
            size={20}
            onClick={() => {
              if (window.confirm("Delete this client?")) {
                handleDelete(row._id);
              }
            }}
          />
        </div>
      ),
      center: true,
      width: "120px",
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
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <DataTable
            columns={columns}
            data={clients}
            pagination
            highlightOnHover
            dense
            fixedHeader
            customStyles={{
              table: {
                style: {
                  borderRadius: "12px",
                },
              },
              headRow: {
                style: {
                  borderBottom: "2px solid #dee2e6",
                },
              },
              rows: {
                style: {
                  borderBottom: "1px solid #e9ecef",
                },
              },
              cells: {
                style: {
                  borderRight: "1px solid #f1f1f1",
                },
              },
              headCells: {
                style: {
                  fontWeight: "600",
                  borderRight: "1px solid #dee2e6",
                },
              },
            }}
          />
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <ClientFormModal
          show={isModalOpen}
          onClose={closeModal}
          data={editClient}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default ClientTable;
