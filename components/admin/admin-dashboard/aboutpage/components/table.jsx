"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import { Trash2, Settings, Pencil } from "lucide-react";
import EditModal from "./modals/editfield";
const AboutPagetable = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [AboutPage, setAboutPage] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [editAboutPage, setEditAboutPage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalRH = (AboutPagedetails) => {
    setEditAboutPage(AboutPagedetails);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  useEffect(() => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    const fetchAboutPage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiurl}/api/about/details`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAboutPage(response.data.data[0]);
          setSuccess(response.data.message);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching AboutPage. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, [apiurl]);
  
  return (
    <>
      <MessageComponent error={error} success={success} />
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
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{ textAlign: "center" }}>S/N</th>
                    <th style={{ textAlign: "center" }}>Title</th>
                    <th style={{ textAlign: "center" }}>
                      Image
                    </th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AboutPage.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  ) : (
                    
                      <tr key="aboutPage">
                        <td style={{ textAlign: "center" }}>{1}</td>
                        <td style={{ textAlign: "center" }}>{AboutPage?.title}</td>
                        <td style={{ textAlign: "center",width:'200px' }} >
                           <img
                                src={AboutPage?.image}
                                alt="AboutImage"
                                className="w-100 h-100 object-cover"
                              />
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-3">
                            <Pencil
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => openModalRH(AboutPage)}
                              size={20}
                            />
                           
                          </div>
                        </td>
                      </tr>
                    
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editAboutPage}
        />
      )}
    </>
  );
};

export default AboutPagetable;
