"use client";

import React from "react";
import HeadSection from "./components/HeadSection";

const Candidatedetails = ({ Newdata = {} }) => {
  return (
    <>
      <HeadSection data={Newdata.header} />
      <div>candidatedetails</div>
    </>
  );
};

export default Candidatedetails;
