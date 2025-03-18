"use client";
import dynamic from "next/dynamic";
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";



const index = () => {
  return (
    <>
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
