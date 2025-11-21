"use client";
import dynamic from "next/dynamic";
import StudentVerification from "@/components/dashboard-pages/institute-dashboard/all-student-list";

const index = () => {
  return (
    <>
      <StudentVerification />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
