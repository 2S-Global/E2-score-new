"use client";
import dynamic from "next/dynamic";
import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";


const index = () => {
  return (
    <>
      <AppliedJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
