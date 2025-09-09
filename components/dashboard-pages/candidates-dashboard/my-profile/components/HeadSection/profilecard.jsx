import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBirthdayCake,
  FaCheckCircle,
} from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

import Cardedit from "../modal/cardeditModal";

const ProfileCard = ({
  name,
  degree,
  location,
  father_name,
  phone,
  email,
  gender,
  dob,
  setReload,
  setError,
  setSuccess,
  isIndianNumber,
  numberVerified,
}) => {
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
      <div className="">
        <div className="card-body p-4">
          {/* Name & Degree Section */}
          <div className="mb-3">
            <h4 className="fw-bold d-flex align-items-center gap-2 mb-2">
              <span className="fs-6">{name}</span>
              {gender && (
                <span className="fs-6 fw-normal text-muted">({gender})</span>
              )}
              <i
                className="la la-pencil-alt text-primary"
                onClick={openModalRH}
                style={{ cursor: "pointer", fontSize: "16px" }}
              ></i>
            </h4>

            {degree && (
              <div className="fs-6 fw-semibold text-dark">{degree}</div>
            )}
            {father_name && (
              <div className="fs-6 text-muted">
                <span className="fw-semibold">Father's Name:</span>{" "}
                {father_name}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="row">
            <div className="col-md-12">
              {location && (
                <p className="mb-2 d-flex align-items-center text-secondary">
                  <FaMapMarkerAlt className="me-2" /> {location}
                </p>
              )}
              {dob && (
                <p className="mb-2 d-flex align-items-center text-secondary">
                  <FaBirthdayCake className="me-2" /> {dob}
                </p>
              )}
              <p className="mb-2 d-flex align-items-center text-secondary">
                <FaPhone className="me-2" /> {phone}
                {numberVerified && (
                  <FaCheckCircle className="ms-2 text-success" />
                )}
                {!numberVerified && (
                  <>
                    {isIndianNumber ? (
                      <FaRegCircleXmark className="ms-2 text-danger" />
                    ) : (
                      <FaRegCircleXmark className="ms-2 text-danger" />
                    )}
                  </>
                )}
              </p>
              <p className="mb-0 d-flex align-items-center text-secondary">
                <FaEnvelope className="me-2" /> {email}
                <FaCheckCircle className="ms-2 text-success" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Cardedit
          show={isModalOpen}
          onClose={closeModalRH}
          setReload={setReload}
          setError_main={setError}
          setSuccess_main={setSuccess}
        />
      )}
    </>
  );
};

export default ProfileCard;
