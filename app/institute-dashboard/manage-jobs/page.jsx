"use client";
import dynamic from "next/dynamic";
import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";

const index = () => {
  return (
    <>
      <ManageJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
