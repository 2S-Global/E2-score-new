"use client";
import React, { useState } from "react";
import PersonalModal from "./modal/PersonalModal";

const PersonalSection = () => {
  // Modal state
  const [modalType, setModalType] = useState(null);
  const [focusSection, setFocusSection] = useState(null);


  // Personal details state (initial data)
  const [personalDetails, setPersonalDetails] = useState({
    gender: "Male",
    maritalStatus: "Single / Unmarried",
    moreinfo :"",
    dob: "13 Oct 2000",
    category: "",
    differentlyAbled: "No",
    careerBreak: "",
    workPermit: "",
    address: "Newtown, Kolkata, 700156",
    languages: [
      { language: "English", proficiency: "Expert", read: true, write: true, speak: true },
    ],
  });

  // Open and close modal handlers
  const openModalRH = (type) => {
    setModalType(type);
    setFocusSection(type); // set the focus section for modal
    document.body.style.overflow = "hidden";
  };
  const closeModalRH = () => {
    setModalType(null);
    setFocusSection(null); // reset focus section
    document.body.style.overflow = "auto";
  };

  // Handle data update from modal
  const handleModalSubmit = (type, data) => {
    switch (type) {
      case "personalInfo":
        setPersonalDetails((prev) => ({
          ...prev,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
        }));
        break;
      case "category":
        setPersonalDetails((prev) => ({ ...prev, category: data.category }));
        break;
      case "careerBreak":
        setPersonalDetails((prev) => ({ ...prev, careerBreak: data.careerBreak }));
        break;
      case "workPermit":
        setPersonalDetails((prev) => ({ ...prev, workPermit: data.workPermit }));
        break;
      case "languages":
        setPersonalDetails((prev) => ({ ...prev, languages: data.languages }));
        break;
      default:
        break;
    }
    closeModalRH(); // Close modal after submission
  };

  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          {/* Title with Edit Icon */}
          <div
            className="widget-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Personal Details</h4>
            <i
              className="la la-pencil-alt"
              onClick={() => openModalRH("editPersonal")}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label="Edit Personal Details"
            ></i>
          </div>

          {/* Personal Details */}
          <div className="widget-content">
            <div className="row p-3">
              <div className="col-md-6">
                {/* Gender & Marital Status */}
                <strong>Personal</strong>
                <div className="typ-14Medium">
                  {personalDetails.gender}, {personalDetails.maritalStatus},{" "}
                  <span
                    onClick={() => openModalRH("personalInfo")}
                    style={{
                      cursor: "pointer",
                      color: "#275df5",
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {personalDetails.moreinfo&&personalDetails.gender && personalDetails.maritalStatus ? "Edit" : "Add more info"}
                  </span>
                </div>

                {/* DOB */}
                <div className="mt-3 mb-1">
                  <strong>Date of Birth</strong>
                  <div className="typ-14Medium">{personalDetails.dob}</div>
                </div>

                {/* Category */}
                <div className="mt-3 mb-1">
                  <strong>Category</strong>
                  <div className="typ-14Medium">
                    {personalDetails.category || (
                      <span
                        onClick={() => openModalRH("category")}
                        style={{
                          cursor: "pointer",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Category
                      </span>
                    )}
                  </div>
                </div>

                {/* Differently abled */}
                <div className="mt-3 mb-1">
                  <strong>Differently Abled</strong>
                  <div className="typ-14Medium">{personalDetails.differentlyAbled}</div>
                </div>
              </div>

              <div className="col-md-6">
                {/* Career Break */}
                <div className="mt-3 mb-1">
                  <strong>Career Break</strong>
                  <div className="typ-14Medium">
                    {personalDetails.careerBreak || (
                      <span
                        onClick={() => openModalRH("careerBreak")}
                        style={{
                          cursor: "pointer",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Career break
                      </span>
                    )}
                  </div>
                </div>

                {/* Work Permit */}
                <div className="mt-3 mb-1">
                  <strong>Work Permit</strong>
                  <div className="typ-14Medium">
                    {personalDetails.workPermit || (
                      <span
                        onClick={() => openModalRH("workPermit")}
                        style={{
                          cursor: "pointer",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Work permit
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mt-3 mb-1">
                  <strong>Address</strong>
                  <div className="typ-14Medium">{personalDetails.address}</div>
                </div>
              </div>
            </div>

            <hr />

            {/* Languages */}
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Languages</h5>
              <span
                onClick={() => openModalRH("languages")}
                style={{
                  cursor: "pointer",
                  color: "#275df5",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                {personalDetails.languages.length > 0 ? "Edit languages" : "Add languages"}
              </span>
            </div>

            {/* Language Table */}
            {personalDetails.languages.length > 0 && (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Languages</th>
                    <th>Proficiency</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Speak</th>
                  </tr>
                </thead>
                <tbody>
                  {personalDetails.languages.map((lang, index) => (
                    <tr key={index}>
                      <td>{lang.language}</td>
                      <td>{lang.proficiency}</td>
                      <td>{lang.read ? "✔️" : "❌"}</td>
                      <td>{lang.write ? "✔️" : "❌"}</td>
                      <td>{lang.speak ? "✔️" : "❌"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal with data submission handler */}
      {modalType && (
        <PersonalModal
          show={!!modalType}
          onClose={closeModalRH}
          modalType={modalType}
          onSubmit={handleModalSubmit}
          data={personalDetails}
          focusSection={focusSection} 
        />
      )}
    </>
  );
};

export default PersonalSection;
