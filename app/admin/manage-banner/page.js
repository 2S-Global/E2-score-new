"use client";
import dynamic from "next/dynamic";
import Banner from "@/components/admin/admin-dashboard/banner";

const index = () => {
  return (
    <>
      <Banner />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
