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
  const [sectionloading, setSectionloading] = useState(true);

  useEffect(() => {}, [reload]);

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div className="ls-widget">
        <div className="tabs-box" onClick={() => setSectionloading(false)}>
          {sectionloading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                <div className="row">Here is your KYC details</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default KYCSection;
