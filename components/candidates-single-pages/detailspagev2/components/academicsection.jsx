"use client";

import React from "react";

import ClgDisplay from "./academic/clgdisplay";
import SchoolDisplay from "./academic/schooldisplay";

import { BadgeCheck, BadgeAlert, Paperclip, Info } from "lucide-react";

const Academysection = ({ userdata = [] }) => {
  const isEmpty = !Array.isArray(userdata) || userdata.length < 1;

  return (
    <div className="ls-widget">
      <div className="tabs-box resume-outer theme-red">
        <div className="widget-title">
          <h4>Academics</h4>
        </div>

        <div className="widget-content">
          {isEmpty ? (
            <span className="text-danger fw-semibold">N/A</span>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <div className="resume-content">
                  {userdata.map((item, index) => {
                    // declare variables here (NOT inside JSX)
                    const certificateURL = item?.certificate_data || null;
                    const transcriptURL = item?.transcript_data || null;

                    // return JSX
                    return (
                      <React.Fragment key={item._id || index}>
                        {/* If level_id is 1 or 2 ⇒ show School */}
                        {item.level_id == 1 || item.level_id == 2 ? (
                          <div className="resume-block">
                            <div className="inner">
                              <span className="name"></span>

                              {/* title box */}
                              <div className="title-box">
                                <div className="info-box">
                                  <h3 style={{ maxWidth: "60%" }}>
                                    {item.level || "Course not specified"}
                                  </h3>

                                  {/* institute */}
                                  <span>
                                    {item.board || "Board not specified"}
                                  </span>
                                  <br />

                                  <span
                                    title={
                                      certificateURL
                                        ? "View Certificate"
                                        : "N/A"
                                    }
                                    style={{
                                      cursor: certificateURL
                                        ? "pointer"
                                        : "not-allowed",
                                      color: certificateURL ? "green" : "red",
                                    }}
                                    className="ms-2"
                                    onClick={() =>
                                      certificateURL &&
                                      window.open(certificateURL, "_blank")
                                    }
                                  >
                                    <Paperclip size={14} />
                                  </span>
                                  {/* Transcript Paperclip */}
                                  <span
                                    title={
                                      transcriptURL ? "View Transcript" : "N/A"
                                    }
                                    style={{
                                      cursor: transcriptURL
                                        ? "pointer"
                                        : "not-allowed",
                                      color: transcriptURL ? "green" : "red",
                                    }}
                                    onClick={() =>
                                      transcriptURL &&
                                      window.open(transcriptURL, "_blank")
                                    }
                                    className="ms-2"
                                  >
                                    <Paperclip size={14} />
                                  </span>
                                </div>

                                {/* right side year */}
                                <div
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
                                    {item.year_of_passing ||
                                      "Year not specified"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="resume-block">
                            <div className="inner">
                              <span className="name"></span>

                              {/* title box */}
                              <div className="title-box">
                                <div className="info-box">
                                  <h3 style={{ maxWidth: "60%" }}>
                                    {item.courseName || "Course not specified"}
                                    {item.courseName_verified ? (
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    ) : (
                                      <BadgeAlert
                                        size={14}
                                        color="red"
                                        className="ms-2"
                                      />
                                    )}
                                  </h3>

                                  {/* institute */}
                                  <span>
                                    {item.instituteName ||
                                      "Institute not specified"}
                                    {item.is_verified ? (
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    ) : (
                                      <BadgeAlert
                                        size={14}
                                        color="red"
                                        className="ms-2"
                                      />
                                    )}
                                  </span>
                                  <br />

                                  {/* university */}
                                  <span className="truncate expType">
                                    {item.universityName}
                                  </span>
                                  <br />

                                  {/* level */}
                                  <span className="truncate expType">
                                    {item?.level}
                                    {item.level_verified ? (
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    ) : (
                                      <BadgeAlert
                                        size={14}
                                        color="red"
                                        className="ms-2"
                                      />
                                    )}
                                  </span>
                                  <br />

                                  {/* course type */}
                                  <span className="truncate expType">
                                    {item.courseType}{" "}
                                    {item.courseType_verified ? (
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    ) : (
                                      <BadgeAlert
                                        size={14}
                                        color="red"
                                        className="ms-2"
                                      />
                                    )}
                                  </span>
                                  <br />
                                  <span>
                                    {!item.is_verified ? (
                                      <></>
                                    ) : (
                                      <strong
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title={item.remarks || "No remarks"}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <Info
                                          size={14}
                                          color="green"
                                          className="ms-2"
                                        />
                                      </strong>
                                    )}
                                  </span>
                                  <span
                                    title={
                                      certificateURL
                                        ? "View Certificate"
                                        : "N/A"
                                    }
                                    style={{
                                      cursor: certificateURL
                                        ? "pointer"
                                        : "not-allowed",
                                      color: certificateURL ? "green" : "red",
                                    }}
                                    className="ms-2"
                                    onClick={() =>
                                      certificateURL &&
                                      window.open(certificateURL, "_blank")
                                    }
                                  >
                                    <Paperclip size={14} />
                                  </span>
                                  {/* Transcript Paperclip */}
                                  <span
                                    title={
                                      transcriptURL ? "View Transcript" : "N/A"
                                    }
                                    style={{
                                      cursor: transcriptURL
                                        ? "pointer"
                                        : "not-allowed",
                                      color: transcriptURL ? "green" : "red",
                                    }}
                                    onClick={() =>
                                      transcriptURL &&
                                      window.open(transcriptURL, "_blank")
                                    }
                                    className="ms-2"
                                  >
                                    <Paperclip size={14} />
                                  </span>
                                </div>

                                {/* right side year */}
                                <div
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
                                    {item.duration?.from || item.duration?.to
                                      ? `${item.duration?.from || ""} - ${
                                          item.duration?.to || "Present"
                                        }`
                                      : "Year not specified"}

                                    {item.duration_verified ? (
                                      <BadgeCheck
                                        size={14}
                                        color="green"
                                        className="ms-2"
                                      />
                                    ) : (
                                      <BadgeAlert
                                        size={14}
                                        color="red"
                                        className="ms-2"
                                      />
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academysection;
