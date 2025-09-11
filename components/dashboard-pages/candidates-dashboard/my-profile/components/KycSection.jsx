"use client";
import { queueRequest } from "../helper/queueHelper";

import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
const KYCSection = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [reload, setReload] = useState(false);
  const [sectionloading, setSectionloading] = useState(false);

  useEffect(() => {}, [reload]);

  const openModalRH = () => {
    console.log("Opening Modal...");
    //  setIsModalOpen(true);
    //document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>KYC</h4>
            {/* Open modal using an onClick function */}
            <i
              className="la la-pencil-alt"
              onClick={openModalRH}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          {sectionloading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                <p style={{ textAlign: "justify" }}>
                  {"Add Your KYC Documents and get verified"}
                </p>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default KYCSection;
