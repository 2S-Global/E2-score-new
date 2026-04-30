"use client";
import dynamic from "next/dynamic";

import ListCandidate from "@/components/dashboard-pages/institute-dashboard/search-student";

const index = () => {
  return (
    <>
      <ListCandidate />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
