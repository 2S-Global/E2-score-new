"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";

const KYCBlock = ({ kycdata = {} }) => {
  const verificationFields = [
    { label: "PAN Card", key: "pan_verified" },
    { label: "Driving License", key: "dl_verified" },
    { label: "EPIC Card", key: "epic_number" },
    { label: "Passport", key: "passport_verified" },
    { label: "Aadhar Card", key: "aadhar_verified" },
    // add more fields easily
  ];
  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>KYC Information</h4>
        </div>

        <div className="widget-content">
          <div className="row">
            {verificationFields.map((field, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-2">
                <div className="info-list d-flex justify-content-between align-items-center">
                  <span className="title">{field.label}:</span>
                  <span className="value">
                    {kycdata?.[field.key] ? (
                      <FaCheckCircle color="green" className="ms-1" />
                    ) : (
                      <FaRegCircleXmark color="red" className="ms-1" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default KYCBlock;
