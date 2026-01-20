"use client";
import dynamic from "next/dynamic";
import Invitation from "@/components/dashboard-pages/employers-dashboard/invitation";

const index = () => {
  return (
    <>
      <Invitation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
