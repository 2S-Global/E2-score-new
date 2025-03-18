"use client";
import dynamic from "next/dynamic";
import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume";



const index = () => {
  return (
    <>
      <MyResume />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
