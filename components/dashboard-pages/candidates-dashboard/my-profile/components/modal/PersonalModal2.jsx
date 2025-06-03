import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import LanguageProficiency from "../academicbox_component/language";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomizedProgressBars from "@/components/common/loader";

import PersonalInfoForm from "../personal_details_component/personal_detailsform";
const PersonalModal = ({ show, onClose, focusSection }) => {
  const [formData, setFormData] = useState({
    gender: "",
    dob: null,
    more_info: [],
    marital_status: "",
    category: "",
    differently_abled: "",
    disability_type: "",
    disability_description: "",
    workplace_assistance: "",
    career_break: "",
    career_break_reason: "",
    career_break_start_year: "",
    career_break_start_month: "",
    currently_on_career_break: false,
    career_break_end_year: "",
    career_break_end_month: "",
    usa_visa_type: "",
    work_permit_other_countries: [],
    permanent_address: "",
    hometown: "",
    pincode: "",
    languages: [
      {
        language: "",
        proficiency: "",
        read: false,
        write: false,
        speak: false,
      },
    ],
  });

  const token = localStorage.getItem("candidate_token");
  if (!token) {
    console.log("No token");
  }

  if (!show) return null;

  return (
    <>
      <style>
        {`
          .custom-textarea::placeholder {
            color: #c7c5c5!important;
            font-size: 15px !important;
          }
          .option-btn {
            border: 1px solid #8c8c8c;
            color: #333;
            background: white;
            font-size: 15px;
            padding: 6px 15px;
            transition: all 0.2s ease-in-out;
          }
          .option-btn.active {
            background: #f0efff;
            font-weight: bold;
            border-color: #635bff;
            color: black;
          }
          .info-btn {
            border: 1px solid #a5a5a5;
            background: white;
            color: #333;
            font-size: 14px;
            padding: 6px 12px;
            transition: all 0.2s ease-in-out;
          }
          .info-btn.active {
            background: #eaeafc;
            font-weight: bold;
            border-color: #635bff;
            color: black;
          }
        `}
      </style>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-3">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Personal Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <p className="text-muted">
                This information helps employers know you better.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => console.log(formData)}
              >
                TEST
              </button>

              <PersonalInfoForm
                formData={formData}
                setFormData={setFormData}
                focusSection={focusSection}
                show={show}
              />
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalModal;
