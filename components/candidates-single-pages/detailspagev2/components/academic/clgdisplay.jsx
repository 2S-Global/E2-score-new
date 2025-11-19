import React, { useState, useEffect } from "react";
import { BadgeCheck, BadgeAlert, Paperclip } from "lucide-react";
import { Info } from "lucide-react";
const ClgDisplay = ({ data }) => {
  const certificateURL = data?.certificate_data || null;
  const transcriptURL = data?.transcript_data || null;
  return (
    <>
      <div className="resume-item emp-list pb-3">
        <div className="item title typ-14Bold">
          <span className="truncate emp-desg">
            <strong>
              {data?.level}
              {data.level_verified ? (
                <BadgeCheck size={20} color="green" className="ms-2" />
              ) : (
                <BadgeAlert size={20} color="red" className="ms-2" />
              )}
            </strong>{" "}
            {/* Edit or Remarks */}
            {!data.is_verified ? (
              <></>
            ) : (
              <strong
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={data.remarks || "No remarks"}
                style={{ cursor: "pointer" }}
              >
                <Info size={20} color="green" className="ms-2" />
              </strong>
            )}
            {/* Certificate Paperclip */}
            <span
              title={certificateURL ? "View Certificate" : "N/A"}
              style={{
                cursor: certificateURL ? "pointer" : "not-allowed",
                color: certificateURL ? "#000" : "red",
              }}
              className="ms-2"
              onClick={() =>
                certificateURL && window.open(certificateURL, "_blank")
              }
            >
              <Paperclip size={18} />
            </span>
            {/* Transcript Paperclip */}
            <span
              title={transcriptURL ? "View Transcript" : "N/A"}
              style={{
                cursor: transcriptURL ? "pointer" : "not-allowed",
                color: transcriptURL ? "#000" : "red",
              }}
              onClick={() =>
                transcriptURL && window.open(transcriptURL, "_blank")
              }
              className="ms-2"
            >
              <Paperclip size={18} />
            </span>
            <br />
            {data?.courseName}
            {data.courseName_verified ? (
              <BadgeCheck size={20} color="green" className="ms-2" />
            ) : (
              <BadgeAlert size={20} color="red" className="ms-2" />
            )}
          </span>
        </div>

        <div className="item experienceType typ-14Regular">
          <span className="truncate expType">
            {data.instituteName}
            {data.is_verified ? (
              <BadgeCheck size={20} color="green" className="ms-2" />
            ) : (
              <BadgeAlert size={20} color="red" className="ms-2" />
            )}
          </span>
          <br />
          <span className="truncate expType">{data.universityName}</span>
          <br />
          <span className="truncate">
            {data.duration.from}-{data.duration.to}{" "}
            {data.duration_verified ? (
              <BadgeCheck size={20} color="green" className="ms-2" />
            ) : (
              <BadgeAlert size={20} color="red" className="ms-2" />
            )}
            {""} | {data.courseType}{" "}
            {data.courseType_verified ? (
              <BadgeCheck size={20} color="green" className="ms-2" />
            ) : (
              <BadgeAlert size={20} color="red" className="ms-2" />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default ClgDisplay;
