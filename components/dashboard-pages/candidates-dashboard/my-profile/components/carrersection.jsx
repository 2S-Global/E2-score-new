"use client";
import React, { useState } from "react";
import CareerModal from "./modal/CareerModal";

const CareerSection = () => {
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
      <div className="ls-widget">
        <div className="tabs-box">
          {/* Title with Edit Icon */}
          <div
            className="widget-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Career Profile</h4>
            <i
              className="la la-pencil-alt"
              onClick={openModalRH}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label="Edit Career Profile"
            ></i>
          </div>

          {/* Career Profile Details */}
          <div className="widget-content">
            <div
              className="career-details"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <strong>Current Industry</strong>
                <div className="typ-14Medium">IT Services & Consulting</div>
              </div>
              <div>
                <strong>Department</strong>
                <div className="typ-14Medium">Engineering - Software & QA</div>
              </div>
              <div>
                <strong>Role Category</strong>
                <div className="typ-14Medium">Software Development</div>
              </div>
              <div>
                <strong>Job Role</strong>
                <div className="typ-14Medium">Full Stack Developer</div>
              </div>
              <div>
                <strong>Desired Job Type</strong>
                <div className="typ-14Medium">Contractual, Permanent</div>
              </div>
              <div>
                <strong>Desired Employment Type</strong>
                <div className="typ-14Medium">Full Time</div>
              </div>
              <div>
                <strong>Preferred Shift</strong>
                <div className="typ-14Medium">Flexible</div>
              </div>
              <div>
                <strong>Preferred Work Location</strong>
                <div className="typ-14Medium">Kolkata</div>
              </div>
              <div>
                <strong>Expected Salary</strong>
                <div className="typ-14Medium">₹4,50,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Modal */}
      {isModalOpen && <CareerModal show={isModalOpen} onClose={closeModalRH} />}
    </>
  );
};

export default CareerSection;
