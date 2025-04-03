"use client";
import dynamic from "next/dynamic";
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

//import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile/demo.jsx";

const index = () => {
  return (
    <>
      {/*   <CompanyProfile /> */}
      <CompanyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
