"use client";
import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/aadhar-otp";

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
