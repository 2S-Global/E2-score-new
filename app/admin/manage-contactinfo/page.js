"use client";
import dynamic from "next/dynamic";
import ManageContactSection from "@/components/admin/admin-dashboard/manage-contactinfo";

const index = () => {
  return (
    <>
      <ManageContactSection />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
