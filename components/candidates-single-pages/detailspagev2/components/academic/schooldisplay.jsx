import React from "react";
import { Paperclip } from "lucide-react";

const SchoolDisplay = ({ data }) => {
  const certificateURL = data?.certificate_data || null;
  const transcriptURL = data?.transcript_data || null;

  return (
    <div className="resume-item emp-list pb-3">
      <div
        className="item title typ-14Bold"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <span className="truncate emp-desg">
          <strong>{data?.level}</strong>
        </span>

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
          className="ms-2"
          onClick={() => transcriptURL && window.open(transcriptURL, "_blank")}
        >
          <Paperclip size={18} />
        </span>
      </div>

      <div className="item experienceType typ-14Regular">
        <span className="truncate expType">{data?.board}</span>
        <br />
        <span className="truncate">{data?.year_of_passing}</span>
      </div>
    </div>
  );
};

export default SchoolDisplay;
