"use client";
import React from "react";

const Workprofileblock = ({ data = [] }) => {
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
        <div className="widget-titlesp m-0 p-0 border-bottom pb-2">
          <h4 className="m-0 p-0">Work Profile</h4>
        </div>

        <div className="m-0 p-0">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="m-0 p-0 mb-2"
                style={{ lineHeight: "1.4" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1 m-0 p-0">
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {item.workTitle || "Untitled Work"}
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

                <span className="text-muted d-block m-0 p-0">
                  Duration: {monthNames[item.durationFrom.month - 1]}{" "}
                  {item.durationFrom.year} -{" "}
                  {monthNames[item.durationTo.month - 1]} {item.durationTo.year}
                </span>

                {item.description && (
                  <div
                    className="mt-1 m-0 p-0"
                    style={{ textAlign: "justify" }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-muted text-center m-0 p-0">
              No work profile data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workprofileblock;
