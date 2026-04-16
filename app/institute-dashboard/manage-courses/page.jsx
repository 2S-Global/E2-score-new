"use client";
import dynamic from "next/dynamic";
import Courses from "@/components/dashboard-pages/institute-dashboard/manage-courses/index.jsx";

const index = () => {
  return (
    <>
      <Courses />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
