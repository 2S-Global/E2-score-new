"use client";
import dynamic from "next/dynamic";
import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";



const index = () => {
  return (
    <>
      <ShortListedJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
