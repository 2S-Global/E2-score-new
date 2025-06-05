"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import ProfileMain from "./accomSection/profile/main";
const AcomSection = () => {
  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Accomplishments</h4>
          </div>

          <div className="widget-content">
            <ProfileMain />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcomSection;
