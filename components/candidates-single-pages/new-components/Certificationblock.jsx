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
    <div className="ls-widget m-0 p-0">
      <div className="tabs-box m-0 p-0">
        <div className="widget-titlesp m-0 p-0 border-bottom pb-1">
          <h4 className="m-0 p-0">Certification</h4>
        </div>

        <div className="widget-content m-0 p-0">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="m-0 p-0 mb-2"
                style={{ lineHeight: "1.6" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1 m-0 p-0">
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {item.title || "N/A"}
                  </span>
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-0 p-0"
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

                <span className="m-0 p-0 d-inline-block">
                  Valid from: {monthNames[item.validityFrommonth - 1]}{" "}
                  {item.validityFromyear}.
                </span>

                {item.doesNotExpire ? (
                  <span className="m-0 p-0 d-inline-block ms-2">
                    Does not expire.
                  </span>
                ) : (
                  <span className="m-0 p-0 d-inline-block ms-2">
                    Valid till: {monthNames[item.validityToMonth - 1]}{" "}
                    {item.validityToyear}.
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="text-muted text-center m-0 p-0">
              No Certification data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationBlock;
