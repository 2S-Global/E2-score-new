import React, { useState, useEffect } from "react";

const ClgDisplay = ({ data, openModalRH }) => {
  return (
    <>
      <div className="resume-item emp-list pb-3">
        <div className="item title typ-14Bold">
          <span className="truncate emp-desg">
            <strong>{data?.level}</strong>
            <br />
            {data?.courseName}
          </span>
          <i
            className="la la-pencil-alt"
            onClick={() => openModalRH(data.level_id, data._id)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div className="item experienceType typ-14Regular">
          <span className="truncate expType">{data.instituteName}</span>
          <br />
          <span className="truncate expType">{data.universityName}</span>
          <br />
          <span className="truncate">
            {data.duration.from}-{data.duration.to} | {data.courseType}
          </span>
        </div>
      </div>
    </>
  );
};

export default ClgDisplay;
