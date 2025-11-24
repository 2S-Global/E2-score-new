"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const KycBox = ({ formData, setFormData, focusSection }) => {
  useEffect(() => {
    if (focusSection) {
      const element = document.getElementById(focusSection);

      if (element) {
        // Scroll into view
        element.scrollIntoView({ behavior: "smooth" });

        if (focusSection != "all") {
          // Add highlight class
          element.classList.add("highlight");
        }
        // Remove after 3s
        const timeout = setTimeout(() => {
          element.classList.remove("highlight");
        }, 3000);

        // Cleanup if effect re-runs
        return () => clearTimeout(timeout);
      }
    }
  }, [focusSection]);

  return (
    <>
      <div id="all">
        {/* cin */}
        <div className="row m-2" id="cin">
          <div className="form-group col-md-6">
            <label className="form-label">CIN Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.cin_number}
              onChange={(e) => {
                setFormData({ ...formData, cin_number: e.target.value });
              }}
              pattern="^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$"
              title="Please enter a valid CIN number"
              placeholder="Enter CIN Number"
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Name as per CIN</label>
            <input
              type="text"
              className="form-control"
              value={formData.cin_name}
              onChange={(e) => {
                setFormData({ ...formData, cin_name: e.target.value });
              }}
              placeholder="Enter Name as per CIN"
            />
          </div>
        </div>
        <div className="row m-2" id="gstin">
          <div className="form-group col-md-6">
            <label className="form-label">GSTIN Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.gstin_number}
              onChange={(e) => {
                setFormData({ ...formData, gstin_number: e.target.value });
              }}
              pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
              title="Please enter a valid GSTIN number"
              placeholder="Enter GSTIN Number"
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Name as per GSTIN</label>
            <input
              type="text"
              className="form-control"
              value={formData.gstin_name}
              onChange={(e) => {
                setFormData({ ...formData, gstin_name: e.target.value });
              }}
              placeholder="Enter Name as per GSTIN"
            />
          </div>
        </div>
        {/* PAN */}
        <div className="row m-2" id="pan">
          <div className="form-group col-md-6">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.pan_number}
              onChange={(e) => {
                setFormData({ ...formData, pan_number: e.target.value });
              }}
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
              title="Please enter a valid PAN number"
              placeholder="Enter PAN Number"
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Name as per PAN</label>
            <input
              type="text"
              className="form-control"
              value={formData.pan_name}
              onChange={(e) => {
                setFormData({ ...formData, pan_name: e.target.value });
              }}
              placeholder="Enter Name as per PAN"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KycBox;
