"use client";
import dynamic from "next/dynamic";
import ManageBannerSection from "@/components/admin/admin-dashboard/manage-banner-section";

const index = () => {
  return (
    <>
      <ManageBannerSection />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
