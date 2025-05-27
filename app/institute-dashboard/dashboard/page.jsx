"use client";
import dynamic from "next/dynamic";
import DashboadHome from "../../../components/dashboard-pages/Institute-dashboard/dashboard";
// import DashboadHome from "../../../";

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
