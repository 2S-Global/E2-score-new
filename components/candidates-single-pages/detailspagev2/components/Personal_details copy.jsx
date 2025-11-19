"use client";

import React, { useState, useEffect } from "react";

import { CircleCheck, CircleX } from "lucide-react";
const PersonalSection = ({ data = {} }) => {
  console.log("PersonalSection data:", data);
  // Personal details state (initial data)
  const [personalDetails, setPersonalDetails] = useState({
    gender: data.gender || "",
    maritalStatus: data.maritalStatus || "",
    moreinfo: data.moreinfo || "",
    dob: data.stringdob || "",
    category: data.category || "",
    differentlyAbled: data.differentlyAbled || "",
    disabilityType: data.disabilityType || "",
    disabilityDescription: data.disabilityDescription || "",
    workplaceAssistance: data.workplaceAssistance || "",
    partner_name: data.partner_name || "",

    careerBreak: data.careerBreak || "",
    careerBreakReason: data.careerBreakReason || "",
    careerBreakStartYear: data.careerBreakStartYear || "",
    careerBreakStartMonth: data.careerBreakStartMonth || "",
    currentlyOnCareerBreak: data.currentlyOnCareerBreak || false,
    careerBreakEndYear: data.careerBreakEndYear || "",
    careerBreakEndMonth: data.careerBreakEndMonth || "",

    workPermit: data.workPermit || "",
    address: data.address || "",
    languages: data.languages || [],
    usa_visa_type: data.usa_visa_type || "",
  });

  useEffect(() => {
    setPersonalDetails({
      gender: data.gender || "",
      maritalStatus: data.maritalStatus || "",
      moreinfo: data.moreinfo || "",
      dob: data.stringdob || "",
      category: data.category || "",
      differentlyAbled: data.differentlyAbled || "",
      disabilityType: data.disabilityType || "",
      disabilityDescription: data.disabilityDescription || "",
      workplaceAssistance: data.workplaceAssistance || "",
      partner_name: data.partner_name || "",

      careerBreak: data.careerBreak || "",
      careerBreakReason: data.careerBreakReason || "",
      careerBreakStartYear: data.careerBreakStartYear || "",
      careerBreakStartMonth: data.careerBreakStartMonth || "",
      currentlyOnCareerBreak: data.currentlyOnCareerBreak || false,
      careerBreakEndYear: data.careerBreakEndYear || "",
      careerBreakEndMonth: data.careerBreakEndMonth || "",

      workPermit: data.workPermit || "",
      address: data.address || "",
      languages: data.languages || [],
      usa_visa_type: data.usa_visa_type || "",
    });
  }, [data]);

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
          </div>

          <>
            {/* Personal Details */}
            <div className="widget-content">
              <div className="container">
                <div className="row">
                  {/* Personal Section */}
                  <div className="col-md-6 mb-4">
                    <strong>Personal</strong>
                    <div className="typ-14Medium mt-1">
                      <div>
                        {[
                          personalDetails.gender,
                          personalDetails.maritalStatus,
                          personalDetails.moreinfo,
                        ]
                          .filter(Boolean)
                          .join(", ")}

                        {![
                          personalDetails.gender,
                          personalDetails.maritalStatus,
                          personalDetails.moreinfo,
                        ].every(Boolean) && (
                          <span className="text-danger fw-semibold">
                            {" "}
                            (Incomplete)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* partner_name */}
                  {personalDetails.partner_name && (
                    <div className="col-md-6 mb-4">
                      <strong>Partner Name</strong>
                      <div
                        className="text-truncate typ-14Medium mt-1"
                        title={personalDetails.partner_name || ""}
                      >
                        {personalDetails.partner_name || "N/A"}
                      </div>
                    </div>
                  )}

                  {/* Career Break */}
                  <div className="col-md-6 mb-4">
                    <strong>Career Break</strong>
                    <div className="typ-14Medium mt-1">
                      {personalDetails.careerBreak ? (
                        personalDetails.careerBreak.toLowerCase() === "yes" ? (
                          <div className="">
                            <div>
                              Yes
                              {personalDetails.careerBreakReason && (
                                <> – {personalDetails.careerBreakReason} </>
                              )}
                            </div>
                            <div className="d-flex flex-wrap gap-1">
                              <div>
                                <strong> From:</strong>{" "}
                                {personalDetails.careerBreakStartMonth}{" "}
                                {personalDetails.careerBreakStartYear}
                              </div>
                              <div>
                                <strong>To:</strong>{" "}
                                {personalDetails.currentlyOnCareerBreak
                                  ? "Present"
                                  : `${personalDetails.careerBreakEndMonth} ${personalDetails.careerBreakEndYear}`}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span>{personalDetails.careerBreak}</span>
                        )
                      ) : (
                        <span className="text-danger fw-semibold">
                          No Career Break information
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6 mb-4">
                    <strong>Date of Birth</strong>
                    <div className="typ-14Medium mt-1">
                      {personalDetails.dob || (
                        <span className="text-danger fw-semibold">
                          No Date of Birth
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-md-6 mb-4">
                    <strong>Category</strong>
                    <div className="typ-14Medium mt-1">
                      {personalDetails.category || (
                        <span className="text-danger fw-semibold">
                          No Category
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Work Permit */}
                  <div className="col-md-6 mb-4">
                    <strong>Work Permit</strong>
                    <div className="typ-14Medium mt-1">
                      {/* Show visa type if available */}
                      {personalDetails.usa_visa_type && (
                        <div>{personalDetails.usa_visa_type}</div>
                      )}

                      {/* Show work permit if available */}
                      {personalDetails.workPermit && (
                        <div>{personalDetails.workPermit}</div>
                      )}

                      {/* Show Add Work Permit only if both are missing */}
                      {!personalDetails.usa_visa_type &&
                        !personalDetails.workPermit && (
                          <span className="text-danger fw-semibold">
                            Add Work Permit
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-md-6 mb-4">
                    <strong>Address</strong>
                    <div className="typ-14Medium mt-1">
                      {personalDetails.address || (
                        <span className="text-danger fw-semibold">
                          No Address
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Differently Abled */}
                  <div className="col-md-6 mb-4">
                    <strong>Differently Abled</strong>
                    <div className="typ-14Medium mt-1">
                      {personalDetails.differentlyAbled ? (
                        personalDetails.differentlyAbled.toLowerCase() ===
                        "yes" ? (
                          <span>
                            {[
                              personalDetails.differentlyAbled,
                              personalDetails.disabilityType,
                              personalDetails.disabilityDescription,
                              personalDetails.workplaceAssistance,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        ) : (
                          <span>{personalDetails.differentlyAbled}</span>
                        )
                      ) : (
                        <span className="text-danger fw-semibold">
                          No Data Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages Section */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Languages</h5>
              </div>

              {/* Language Table */}
              {personalDetails.languages.length > 0 && (
                <div className="table-responsive mt-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Language</th>
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
                          <td>
                            {lang.read ? (
                              <CircleCheck color="#00A85A" size={18} />
                            ) : (
                              <CircleX color="#FF0000" size={18} />
                            )}
                          </td>
                          <td>
                            {lang.write ? (
                              <CircleCheck color="#00A85A" size={18} />
                            ) : (
                              <CircleX color="#FF0000" size={18} />
                            )}
                          </td>
                          <td>
                            {lang.speak ? (
                              <CircleCheck color="#00A85A" size={18} />
                            ) : (
                              <CircleX color="#FF0000" size={18} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!personalDetails.languages.length > 0 && (
                <span className="text-danger fw-semibold">
                  No Data Available
                </span>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default PersonalSection;
