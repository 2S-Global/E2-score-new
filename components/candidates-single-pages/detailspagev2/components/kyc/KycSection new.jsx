"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

const KYCSection = ({ data }) => {
  if (!data) return null;

  // Utility component to render each document block
  const KYCItem = ({ title, item, fields }) => {
    const hasData =
      item &&
      Object.values(item).some(
        (v) => v !== "N/A" && v !== "" && v !== null && v !== false
      );

    return (
      <div className="col-md-6 mb-2">
        <strong>{title}</strong>

        {/* Status Icons */}
        {hasData && (
          <>
            {item.verified ? (
              <FaCheckCircle className="ms-2 text-success" />
            ) : (
              <FaRegCircleXmark className="ms-2 text-danger" />
            )}
          </>
        )}

        {/* Content */}
        <div className="mt-2 text-secondary" style={{ lineHeight: 1.5 }}>
          {hasData ? (
            fields.map(({ label, key }) => (
              <div key={key}>
                <span className="fw-semibold">{label}:</span>{" "}
                {item[key] || "N/A"}
              </div>
            ))
          ) : (
            <span className="text-danger fw-semibold">Data Not Available</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>KYC</h4>
        </div>

        <div className="widget-content">
          <div className="row">
            {/* PAN */}
            <KYCItem
              title="PAN Card"
              item={data.pan}
              fields={[
                { label: "Name", key: "name" },
                { label: "PAN Number", key: "number" },
              ]}
            />
            {/* EPIC */}
            <KYCItem
              title="EPIC Card"
              item={data.epic}
              fields={[
                { label: "Name", key: "name" },
                { label: "EPIC Number", key: "number" },
              ]}
            />

            {/* Driving License */}
            <KYCItem
              title="Driving License"
              item={data.dl}
              fields={[
                { label: "Name", key: "name" },
                { label: "DL Number", key: "number" },
                { label: "DOB", key: "dob" },
              ]}
            />

            {/* Passport */}
            <KYCItem
              title="Passport"
              item={data.passport}
              fields={[
                { label: "Name", key: "name" },
                { label: "Passport File Number", key: "number" },
                { label: "DOB", key: "dob" },
              ]}
            />

            {/* Aadhar */}
            <KYCItem
              title="Aadhar Card"
              item={data.aadhar}
              fields={[
                { label: "Aadhar Number", key: "number" },
                { label: "Aadhar Name", key: "name" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCSection;
