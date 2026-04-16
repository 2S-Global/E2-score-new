"use client";
import dynamic from "next/dynamic";

import InstituteStudentImportMarks from "@/components/dashboard-pages/institute-dashboard/institute-student-import-marks";

const index = () => {
  return (
    <>
      <InstituteStudentImportMarks />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
