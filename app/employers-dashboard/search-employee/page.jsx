"use client";
import dynamic from "next/dynamic";
import Verifyemployee from "@/components/dashboard-pages/employers-dashboard/search-verified";

const index = () => {
  return (
    <>
      <Verifyemployee />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
