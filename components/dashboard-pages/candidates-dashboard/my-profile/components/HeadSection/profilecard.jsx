import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBirthdayCake,
  FaCheckCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import Cardedit from "../modal/cardeditModal";

const ProfileCard = ({
  name,
  degree,
  location,
  phone,
  email,
  gender,
  dob,
  setReload,
  setError,
  setSuccess,
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
      <div className="p-4">
        {/* Name & Degree Section */}
        <div className="">
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-1">
            <span>{name}</span>
            {gender && (
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                ({gender})
              </span>
            )}
            <i
              className="la la-pencil-alt fs-5"
              onClick={openModalRH}
              style={{ cursor: "pointer" }}
            ></i>
          </h4>

          {degree && <h6 className="text-muted">{degree}</h6>}
          {/*  <p className="text-muted">{university}</p> */}
        </div>

        {/* Info Section */}
        <div className="row">
          {/* Left Section */}
          <div className="col-md-12">
            <p className="mb-0">
              <FaMapMarkerAlt className="text-secondary me-2" /> {location}
            </p>
            {/*  <p className="mb-0"><FaUser className="text-secondary me-2" /> {gender}</p> */}
            {dob && (
              <p className="mb-0">
                <FaBirthdayCake className="text-secondary me-2" /> {dob}
              </p>
            )}
            <p className="mb-0">
              <FaPhone className="text-secondary me-2" /> {phone}{" "}
              <FaCheckCircle className="text-success" />
            </p>
            <p className="mb-0">
              <FaEnvelope className="text-secondary me-2" /> {email}{" "}
              <FaCheckCircle className="text-success" />
            </p>
          </div>

          {/* Right Section */}
          {/*  <div className="col-md-6">
            <p className="mb-0"><FaPhone className="text-secondary me-2" /> {phone} <FaCheckCircle className="text-success" /></p>
            <p className="mb-0"><FaEnvelope className="text-secondary me-2" /> {email} <FaCheckCircle className="text-success" /></p>
          </div> */}
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
