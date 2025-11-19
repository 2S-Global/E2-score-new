"use client";

import React from "react";

const TextSection = ({ title, value, fallback }) => {
  const hasText = typeof value === "string" && value.trim().length > 0;

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>{title}</h4>
        </div>

        <div className="widget-content">
          {hasText ? (
            <p style={{ textAlign: "justify" }}>{value.trim()}</p>
          ) : (
            <span
              className="text-danger fw-semibold"
              style={{ textAlign: "justify" }}
            >
              {fallback}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextSection;
