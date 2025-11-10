"use client";
import React from "react";

const ReseachBlock = ({ data = [] }) => {
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
          <h4> White Paper / Research Publication / Journal Entry</h4>
        </div>

        <div className="widget-content">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="mb-2"
                style={{ lineHeight: "1.4" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {item.title || "Untitled Work"}
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

                <span className="text-muted">
                  Published On : {monthNames[item.publishedOn.month - 1]}{" "}
                  {item.publishedOn.year}
                </span>

                {item.description && (
                  <div
                    className="mt-1"
                    style={{ textAlign: "justify" }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-muted text-center py-3">
              No White Paper / Research Publication / Journal Entry data
              available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReseachBlock;
