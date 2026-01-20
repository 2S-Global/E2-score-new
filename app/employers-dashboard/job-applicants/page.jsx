"use client";
import dynamic from "next/dynamic";
import JobApplicant from "@/components/dashboard-pages/employers-dashboard/job-applicants";

const index = () => {
  return (
    <>
      <JobApplicant />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
