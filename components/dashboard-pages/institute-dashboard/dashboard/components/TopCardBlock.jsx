"use client";
import React, { useState } from "react";

const TopCardBlock = () => {
  // Static values instead of API
  const [TotalCompany] = useState(12);
  const [totalPayment] = useState(1580.75);
  const [TotalCandidate] = useState(256);
  const [TotalInstitution] = useState(8);

  const cardContent = [
    {
      id: 1,
      icon: "la-building", // Better for "Total Company"
      countNumber: TotalCompany,
      metaName: "Total Candidate",
      uiClass: "ui-green",
    },
    {
      id: 2,
      icon: "la-credit-card", // Better for "Total Payments"
      countNumber: TotalInstitution,
      metaName: "Pending Request",
      uiClass: "ui-blue",
    },
    {
      id: 3,
      icon: "la-file-alt", // "File/Document" type icon for "Active Verification"
      countNumber: TotalCandidate,
      metaName: "Approved Candidate",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la-hourglass-half", // "Pending" feeling for "Pending Verification"
      countNumber: `₹${Number(totalPayment).toFixed(2).toLocaleString("en-IN")}`,
      metaName: "Total Transaction",
      uiClass: "ui-yellow",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i
                className={`icon la ${item.icon}`}
                style={{ height: "37px", width: "31px", lineHeight: "25px" }}
              ></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
