"use client";
import React, { useState } from "react";
import CircularProgress from "./HeadSection/profilepic";
import ProfileCard from "./HeadSection/profilecard";
import EscoreSection from "./EscoreSection";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaBirthdayCake, FaCheckCircle } from "react-icons/fa";







const ScoreSection = () => {
  const [score, setScore] = useState(650);
  const [label, setLabel] = useState("Eisil Score");

  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-content">
            {/* main code start here */}
            <div className="row">
              <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
                <div className="p-4">
                  {/* Name & Degree Section */}
                  <div className="mb-3">
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                      Abhishek Dey &nbsp;
                    </h4>
                    <p className="mb-2"><FaPhone className="text-secondary me-2" /> 8420089580</p>
                    <p className="mb-2"><FaEnvelope className="text-secondary me-2" /> ab.dey2001@gmail.com</p>

                  </div>


                </div>

              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
                <img src="/images/resource/nextUpdate.png" alt="Profile" className="w-100 h-100 object-cover" />


              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
                <img src="/images/resource/cibil.png" alt="Profile" className="w-100 h-100 object-cover" />

              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
                <img src="/images/resource/experian.png" alt="Profile" className="w-100 h-100 object-cover" />
              </div>











            </div>
            {/* end */}
          </div>
        </div>
      </div>

    </>
  );
};

export default ScoreSection;
