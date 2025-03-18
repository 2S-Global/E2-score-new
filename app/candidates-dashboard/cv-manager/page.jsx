"use client";
import dynamic from "next/dynamic";
import CvManager from "@/components/dashboard-pages/candidates-dashboard/cv-manager";



const index = () => {
  return (
    <>
      <CvManager />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
