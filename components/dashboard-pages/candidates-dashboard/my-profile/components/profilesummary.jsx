"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Profilesum from "./modal/profilesum";

const ProfilesumerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilesummary, setProfilesummary] = useState(
    "Highlight your key career achievements to help employers know your potentials."
  );
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchprofilesummary = async () => {
      try {
        const token = localStorage.getItem("candidate_token");
        const response = await axios.get(
          `${apiurl}/api/userdata/profile_summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //set only if response code is 200
        setProfilesummary(response.data.profileSummary);
      } catch (error) {
        console.error("Error fetching profile pic:", error);
      }
    };
    fetchprofilesummary();
  });
  return (
    <>
      {/* Resume Headline Section */}
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Profile summary</h4>
            {/* Open modal using an onClick function */}
            <span
              onClick={openModalRH}
              style={{
                cursor: "pointer",
                float: "right",
                color: "#275df5",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              Add profile summary
            </span>
          </div>
          {/* Display Resume Headline */}
          <div className="widget-content">
            <p>{profilesummary}</p>
          </div>
        </div>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <Profilesum
          show={isModalOpen}
          onClose={closeModalRH}
          profilesummary={profilesummary}
          setProfilesummary={setProfilesummary}
        />
      )}
    </>
  );
};

export default ProfilesumerySection;
