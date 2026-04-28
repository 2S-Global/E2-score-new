"use client";
import dynamic from "next/dynamic";

import Company from "@/components/dashboard-pages/institute-dashboard/institute-company";

const index = () => {
  return (
    <>
      <Company />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
