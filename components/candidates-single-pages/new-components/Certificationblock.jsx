"use client";
import React from "react";

const CertificationBlock = ({ data = [] }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Certification</h4>
        </div>

        <div className="widget-content">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="mb-2"
                style={{ lineHeight: "1.6" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {item.title || "N/A"}
                  </span>
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      color: "#275df5",
                      fontWeight: 500,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.url}
                  </a>
                )}

                {item.validityFrommonth && item.validityFromyear && (
                  <span>
                    Valid from:{" "}
                    {`${monthNames[item.validityFrommonth - 1]} ${item.validityFromyear}.`}
                  </span>
                )}

                <span className="mx-2">
                  {item.doesNotExpire
                    ? "Does not expire."
                    : item.validityToMonth && item.validityToyear
                      ? `Valid till: ${monthNames[item.validityToMonth - 1]} ${item.validityToyear}.`
                      : ""}
                </span>
              </div>
            ))
          ) : (
            <div className="text-muted text-center py-3">
              No Certification data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationBlock;
