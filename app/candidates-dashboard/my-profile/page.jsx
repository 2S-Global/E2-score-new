"use client";
import dynamic from "next/dynamic";
//import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";
import CanProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile/naukri";




const index = () => {
  return (
    <>
     {/*  <MyProfile /> */}
      <CanProfile /> {/* Replace with your actual component */}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
