import Link from "next/link";

import Image from "next/image";
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
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [message_id, setMessageId] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("employer_token");
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/companyprofile/get_user_associated_with_company`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCandidatesData(response.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

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
      <div className="container">
        <div className="row">
          {candidatesData.map((candidate) => (
            <div className="col-md-6 mb-3" key={candidate.userId}>
              <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="me-3">
                    <img
                      width={70}
                      height={70}
                      src={candidate.photo}
                      alt="candidates"
                      className="rounded-circle border border-primary"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">
                      <Link
                        href={`/candidates-details/${candidate.userId}`}
                        className="text-decoration-none text-dark"
                      >
                        {candidate.name}
                      </Link>
                    </h6>
                    <p className="mb-1 small text-muted">
                      {candidate.jobTitle}
                    </p>
                    <p className="mb-2 small text-muted d-flex align-items-center">
                      <i className="flaticon-map-locator me-1 text-primary"></i>{" "}
                      {candidate.currentAddress}
                    </p>

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={openModalRH}
                      >
                        <i className="la la-eye me-1"></i> View
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="la la-trash me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModalRH} />
    </>
  );
};

export default Applicants;
