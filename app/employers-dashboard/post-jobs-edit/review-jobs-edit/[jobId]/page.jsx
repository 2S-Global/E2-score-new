"use client";
import dynamic from "next/dynamic";
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";
import ReviewJob from "@/components/dashboard-pages/employers-dashboard/review-jobs-edit";

const index = () => {
  return (
    <>
      <ReviewJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
