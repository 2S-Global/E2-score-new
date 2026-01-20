"use client";
import dynamic from "next/dynamic";
import Shortlisted from "@/components/dashboard-pages/employers-dashboard/shortlisted";

const index = () => {
  return (
    <>
      <Shortlisted />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
