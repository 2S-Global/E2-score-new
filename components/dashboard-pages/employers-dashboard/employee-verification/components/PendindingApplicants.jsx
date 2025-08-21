import Link from "next/link";
import candidatesData from "../../../../../data/candidates";
import Image from "next/image";
import Modal from "./modal";
import { useState } from "react";

const Applicants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {candidatesData.slice(17, 23).map((candidate) => (
            <div className="col-md-6 mb-3" key={candidate.id}>
              <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="me-3">
                    <Image
                      width={70}
                      height={70}
                      src={candidate.avatar}
                      alt="candidates"
                      className="rounded-circle border border-primary"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">
                      <Link
                        href={`/candidates-details/${candidate.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {candidate.name}
                      </Link>
                    </h6>
                    <p className="mb-1 small text-muted">
                      {candidate.designation}
                    </p>
                    <p className="mb-2 small text-muted d-flex align-items-center">
                      <i className="flaticon-map-locator me-1 text-primary"></i>{" "}
                      {candidate.location}
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
