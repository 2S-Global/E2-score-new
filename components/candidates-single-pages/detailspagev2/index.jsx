"use client";

import React from "react";
import { BadgeCheck, BadgeAlert, Info } from "lucide-react";
import HeadSection from "./components/headsection.jsx";
import KYCSection from "./components/kyc/KycSection new.jsx";
import TextSection from "./components/textSection.jsx";
import PersonalSection from "./components/Personal_details copy.jsx";
import Academysection from "./components/academicsection.jsx";
import CareerSection from "./components/carrersection.jsx";
const Candidatedetails = ({ Newdata }) => {
  const head = Newdata.headsectiondata;
  const kyc = Newdata.kycData;
  const resumeHeadline = Newdata.personalData?.resumeHeadline;
  const profileSummary = Newdata.personalData?.profileSummary;
  const keyskill = Newdata.personalData?.skills || [];
  const Worklist = Newdata.Worklist || [];
  const whitepaper = Newdata.whitepaper || [];
  const presentation = Newdata.presentation || [];
  const patent = Newdata.patent || [];
  const certificate = Newdata.certificate || [];
  const carrer = Newdata.careerProfile || {};
  const employment = Newdata.employmentdata || [];
  const projects = Newdata.projectData || [];

  console.log("Newdata", Newdata);

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
    <>
      <HeadSection data={head} />
      <KYCSection data={kyc} />

      <TextSection
        title="Resume Headline"
        value={resumeHeadline}
        fallback="Candidate's Resume Headline is Missing"
      />

      <TextSection
        title="Profile Summary"
        value={profileSummary}
        fallback="Candidate's Profile Summary is Missing"
      />

      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Key Skills</h4>
          </div>

          <div className="widget-content">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {Array.isArray(keyskill) && keyskill.length > 0 ? (
                keyskill.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 8px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                    }}
                  >
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </span>
                ))
              ) : (
                <span className="text-danger fw-semibold">
                  No Key Skills Provided
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <PersonalSection data={Newdata?.personalData || {}} />

      <Academysection userdata={Newdata?.academicDetails || {}} />
      <>
        <h5>Accomplishments</h5>
        <div className="ls-widget">
          <div className="tabs-box">
            <div className="widget-content">
              <div className="my-3">
                <div className="pt-4">
                  <h5>Work Profile</h5>

                  {/* dont render if list is empty */}
                  {Array.isArray(Worklist) &&
                    Worklist.length > 0 &&
                    Worklist.map((item) => (
                      <div
                        key={item._id}
                        className="my-2"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {item.workTitle}
                        </span>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            color: "#275df5",
                            fontWeight: 500,
                          }}
                        >
                          {item.url}
                        </a>

                        <span className="text-muted">
                          Duration: {item.durationFrom.month}{" "}
                          {item.durationFrom.year} -{" "}
                          {item.currentlyWorking === true ? (
                            "Present"
                          ) : (
                            <>
                              {item.durationTo.month} {item.durationTo.year}
                            </>
                          )}
                        </span>
                        <br />

                        <span
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></span>
                      </div>
                    ))}
                  {Worklist.length === 0 && (
                    <span className="text-danger fw-semibold">
                      No Work Profile Provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ls-widget">
          <div className="tabs-box">
            <div className="widget-content">
              <div className="my-3">
                <div className="pt-4">
                  <h5>White Paper / Research Publication / Journal Entry</h5>

                  {/* dont render if list is empty */}
                  {Array.isArray(whitepaper) &&
                    whitepaper.length > 0 &&
                    whitepaper.map((item) => (
                      <div
                        key={item._id}
                        className="my-2"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {item.title}
                        </span>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            color: "#275df5",
                            fontWeight: 500,
                          }}
                        >
                          {item.url}
                        </a>

                        <span className="text-muted">
                          Published On : {item.publishedOn.month}{" "}
                          {item.publishedOn.year}
                        </span>
                        <br />

                        <span
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></span>
                      </div>
                    ))}
                  {whitepaper.length === 0 && (
                    <span className="text-danger fw-semibold">
                      No White Paper / Research Publication / Journal Entry
                      Provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ls-widget">
          <div className="tabs-box">
            <div className="widget-content">
              <div className="my-3">
                <div className="pt-4">
                  <h5>Presentation</h5>

                  {/* dont render if list is empty */}
                  {Array.isArray(presentation) &&
                    presentation.length > 0 &&
                    presentation.map((item) => (
                      <div
                        key={item._id}
                        className="my-2"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {item.title}
                        </span>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            color: "#275df5",
                            fontWeight: 500,
                          }}
                        >
                          {item.url}
                        </a>

                        <span
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></span>
                      </div>
                    ))}
                  {presentation.length === 0 && (
                    <span className="text-danger fw-semibold">
                      No Presentation Provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ls-widget">
          <div className="tabs-box">
            <div className="widget-content">
              <div className="my-3">
                <div className="pt-4">
                  <h5>Patent</h5>

                  {/* dont render if list is empty */}
                  {Array.isArray(patent) &&
                    patent.length > 0 &&
                    patent.map((item) => (
                      <div
                        key={item._id}
                        className="my-2"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {item.title}

                          <i
                            onClick={() => openModal(item)}
                            className="la la-pencil-alt ms-2"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </span>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            color: "#275df5",
                            fontWeight: 500,
                          }}
                        >
                          {item.url}
                        </a>
                        <span>Patent office: {item.patent_office}</span>
                        <br />
                        <span>
                          Application number: {item.application_number}
                        </span>
                        <br />
                        {item.status === "Patent pending" ? (
                          <>
                            <span>Issued on: -</span>
                          </>
                        ) : (
                          <>
                            <span>
                              Issued on: {monthNames[item.issue_month - 1]}{" "}
                              {item.issue_year}
                            </span>
                          </>
                        )}

                        <br />
                        <span
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></span>
                      </div>
                    ))}
                  {patent.length === 0 && (
                    <span className="text-danger fw-semibold">
                      No Patent Provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ls-widget">
          <div className="tabs-box">
            <div className="widget-content">
              <div className="my-3">
                <div className="pt-4">
                  <h5>Certification</h5>

                  {/* dont render if list is empty */}
                  {Array.isArray(certificate) &&
                    certificate.length > 0 &&
                    certificate.map((item) => (
                      <div
                        key={item._id}
                        className="my-2"
                        style={{ lineHeight: "1.4" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {item.title}
                        </span>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            color: "#275df5",
                            fontWeight: 500,
                            wordBreak: "break-all"
                          }}
                        >
                          {item.url}
                        </a>
                        <span>
                          Valid from: {monthNames[item.validityFrommonth - 1]}{" "}
                          {item.validityFromyear} .
                        </span>

                        {item.doesNotExpire ? (
                          <>
                            <span className="mx-2">Does not expire.</span>
                          </>
                        ) : (
                          <>
                            <span className="mx-2">
                              Valid till: {monthNames[item.validityToMonth - 1]}{" "}
                              {item.validityToyear}.
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  {certificate.length === 0 && (
                    <span className="text-danger fw-semibold">
                      No Certification Provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <CareerSection data={carrer} />
      {/* employment */}
      <div className="ls-widget">
        <div className="tabs-box resume-outer theme-blue">
          <div className="widget-title">
            <h4>Employment </h4>
          </div>
          <div className="widget-content">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <div className="resume-content">
                {employment.length === 0 && (
                  <span className="text-danger fw-semibold">
                    No Employment Provided
                  </span>
                )}

                {employment.map((row, index) => (
                  <div className="resume-block" key={row._id}>
                    <div className="inner">
                      <span className="name">{/* item.meta || */ ""}</span>
                      <div className="title-box">
                        <div className="info-box">
                          <div className="dashboard-title-year">
                                <h3>
                                  {row.job_title || "Untitled Role"}
                                  {row.designationVerified ? (
                                    <>
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <BadgeAlert
                                        size={14}
                                        color="orange"
                                        className="ms-2"
                                      />
                                    </>
                                  )}
                                  {row.isVerified ? (
                                    <>
                                      <span
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title={row.remarks || "No remarks"}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <Info
                                          size={14}
                                          color="green"
                                          className="ms-2"
                                        />
                                      </span>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </h3>
                                <div
                                  className="edit-box"
                                 
                                >
                                          <span
                                            className="year"
                                            style={{
                                              textAlign: "center",
                                            }}
                                          >
                                            {row.joining_month_name} {row.joining_year} to{" "}
                                            {row.currentlyWorking ? (
                                              "Present"
                                            ) : (
                                              <>
                                                {" "}
                                                {row.leaving_month_name} {row.leaving_year}
                                              </>
                                            )}{" "}
                                            {row.jobDurationVerified ? (
                                              <>
                                                <BadgeCheck
                                                  size={14}
                                                  color="green"
                                                  className="ms-2"
                                                />
                                              </>
                                            ) : (
                                              <>
                                                <BadgeAlert
                                                  size={14}
                                                  color="orange"
                                                  className="ms-2"
                                                />
                                              </>
                                            )}
                                          </span>
                              </div>
                          </div>
                          <span>
                            {row.company_name || "Company not specified"}
                            <img
                              src={
                                row.isVerified
                                  ? "/images/resource/verified.png"
                                  : "/images/resource/unverified.png"
                              }
                              alt={row.isVerified ? "Verified" : "Not Verified"}
                              style={{ width: "100px", height: "20px" }}
                              className="ms-2"
                            />
                          </span>
                          <br />
                          <span>
                            {row.employmenttype?.charAt(0).toUpperCase() +
                              row.employmenttype?.slice(1).toLowerCase()}{" "}
                            {row.jobTypeVerified ? (
                              <>
                                <BadgeCheck
                                  size={14}
                                  color="green"
                                  className="ms-2"
                                />
                              </>
                            ) : (
                              <>
                                <BadgeAlert size={14} className="ms-2" />
                              </>
                            )}
                          </span>
                          <br />
                          {row.notice_period && (
                            <span>
                              Notice Period : {row.notice_period_name}
                            </span>
                          )}
                          <span
                            style={{ textAlign: "justify" }}
                            dangerouslySetInnerHTML={{
                              __html: row.description || "",
                            }}
                          ></span>
                        </div>
                      {/*   <div
                          className="edit-box"
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                          }}
                        >
                          <span
                            className="year"
                            style={{
                              minWidth: "120px",
                              textAlign: "center",
                            }}
                          >
                            {row.joining_month_name} {row.joining_year} to{" "}
                            {row.currentlyWorking ? (
                              "Present"
                            ) : (
                              <>
                                {" "}
                                {row.leaving_month_name} {row.leaving_year}
                              </>
                            )}{" "}
                            {row.jobDurationVerified ? (
                              <>
                                <BadgeCheck
                                  size={14}
                                  color="green"
                                  className="ms-2"
                                />
                              </>
                            ) : (
                              <>
                                <BadgeAlert
                                  size={14}
                                  color="orange"
                                  className="ms-2"
                                />
                              </>
                            )}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects  */}
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Projects</h4>
            {/* Open modal using an onClick function */}
          </div>
          <>
            <div className="widget-content">
              {projects.length > 0 ? (
                <>
                  {projects.map((item) => (
                    <div
                      key={item._id}
                      className="my-2"
                      style={{ lineHeight: "1.4" }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {item.title}
                      </span>
                      <br />

                      <span className="text-muted">
                        Duration: {item.workfrommonth_name} {item.workfromyear}{" "}
                        to{" "}
                        {item.status === "in-progress" ? (
                          <>
                            <span>Present</span>
                          </>
                        ) : (
                          <span>
                            {item.worktomonth_name} {item.worktoyear}
                          </span>
                        )}
                      </span>
                      <br />

                      <p style={{ textAlign: "justify" }}>{item.description}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <span className="text-danger fw-semibold">
                    No projects found.
                  </span>
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Candidatedetails;
