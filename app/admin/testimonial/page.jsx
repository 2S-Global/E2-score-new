"use client";
import dynamic from "next/dynamic";
import Testimonial from "@/components/admin/admin-dashboard/testimonial";

const index = () => {
  return (
    <>
      <Testimonial />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
