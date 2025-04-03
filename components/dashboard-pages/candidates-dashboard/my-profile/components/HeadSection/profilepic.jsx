import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Profilepic from "../modal/ChangeProfilepic";

const CircularProgress = ({ progress, imageSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalRH = () => setIsModalOpen(true);
  const closeModalRH = () => setIsModalOpen(false);

  const radius = 100; // Increased radius
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Determine stroke color based on progress
  const getStrokeColor = () => {
    if (progress < 50) return "#EF4444"; // Red
    if (progress < 80) return "#F59E0B"; // Orange
    return "#10B981"; // Green
  };

  return (
    <>
      <div
        className="position-relative"
        style={{ width: "200px", height: "200px" }}
      >
        {/* SVG Progress Ring */}
        <svg width="100%" height="100%" viewBox="0 0 220 220">
          {/* Background Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />
        </svg>

        {/* Profile Image with Hover Effect & Click to Open Modal */}
        <div
          className="position-absolute top-50 start-50 translate-middle border border-white shadow-lg rounded-circle overflow-hidden"
          style={{ width: "110px", height: "110px", cursor: "pointer" }}
          onClick={openModalRH}
        >
          <img
            src={imageSrc || "/images/resource/candidate-1.png"}
            alt="Profile"
            className="w-100 h-100 object-cover"
          />
          {/* Hover Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white fw-bold"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: "0",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <span>Replace Photo</span>
          </div>
        </div>

        {/* Percentage Label */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x bg-white px-3 py-1 rounded-pill fw-semibold shadow-sm"
          style={{
            color: getStrokeColor(),
            border: `1px solid ${getStrokeColor()}`,
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <Profilepic
          show={isModalOpen}
          onClose={closeModalRH}
          imageSrc={imageSrc}
        />
      )}
    </>
  );
};

export default CircularProgress;
