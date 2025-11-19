"use client";

import React from "react";

import ClgDisplay from "./academic/clgdisplay";
import SchoolDisplay from "./academic/schooldisplay";

const Academysection = ({ userdata = [] }) => {
  const isEmpty = !Array.isArray(userdata) || userdata.length < 1;

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Academics</h4>
        </div>

        <div className="widget-content">
          {isEmpty ? (
            <span className="text-danger fw-semibold">N/A</span>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <div className="resume-content">
                {userdata.map((item, index) => (
                  <div key={index}>
                    {item.level_id == 1 || item.level_id == 2 ? (
                      <SchoolDisplay data={item} />
                    ) : (
                      <ClgDisplay data={item} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academysection;
