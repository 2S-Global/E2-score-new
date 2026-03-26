"use client";
import dynamic from "next/dynamic";
// import SiteSettingProfile from "@/components/admin/admin-dashboard/site-setting-profile";
import ManageBannerSection from "@/components/admin/admin-dashboard/manage-banner-section";

const index = () => {
  return (
    <>
      {/* <SiteSettingProfile /> */}
      <ManageBannerSection />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
