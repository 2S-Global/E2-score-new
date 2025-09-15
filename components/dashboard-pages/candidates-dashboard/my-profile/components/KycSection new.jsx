"use client";
import { queueRequest } from "../helper/queueHelper";

import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";

import KycModal from "./kyc/kycModal";
const KYCSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [focusSection, setFocusSection] = useState(null);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message_id, setMessageId] = useState(null);
  const [reload, setReload] = useState(false);
  const [sectionloading, setSectionloading] = useState(false);

  useEffect(() => {}, [reload]);

  const openModalRH = (type) => {
    setFocusSection(type);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>KYC NEW</h4>
            {/* Open modal using an onClick function */}
            <i
              className="la la-pencil-alt"
              onClick={() => openModalRH("ALL")}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          {sectionloading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <strong>Pan Card</strong>
                    <div>
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                        onClick={() => openModalRH("pan")}
                      >
                        Add PAN info
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <strong>Driving License</strong>
                    <div>
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                        onClick={() => openModalRH("dl")}
                      >
                        Add Driving License Info
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <strong>EPIC Card</strong>
                    <div>
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                        onClick={() => openModalRH("epic")}
                      >
                        Add EPIC Details
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <strong>Passport </strong>
                    <div>
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                        onClick={() => openModalRH("dl")}
                      >
                        Add Passport Info
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <strong>Aadhar Card With OTP</strong>
                    <div>
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                        onClick={() => openModalRH("dl")}
                      >
                        Add Aadhar Card With OTP Info
                      </span>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </div>

      <KycModal
        show={isModalOpen}
        onClose={closeModalRH}
        setError={setError}
        setSuccess={setSuccess}
        setMessageId={setMessageId}
        setErrorId={setErrorId}
        setReload={setReload}
        setSectionloading={setSectionloading}
        focusSection={focusSection}
      />
    </>
  );
};

export default KYCSection;
