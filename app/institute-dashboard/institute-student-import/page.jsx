"use client";
import dynamic from "next/dynamic";

import InstituteStudentImport from "@/components/dashboard-pages/institute-dashboard/institute-student-import";

const index = () => {
  return (
    <>
      <InstituteStudentImport />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
