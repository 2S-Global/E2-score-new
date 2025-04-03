"use client";
import dynamic from "next/dynamic";
import Paynow from "@/components/dashboard-pages/employers-dashboard/paynow";

const index = () => {
  return (
    <>
      <Paynow />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
