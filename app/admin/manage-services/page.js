"use client";
import dynamic from "next/dynamic";
import ListServiceDetails from "@/components/admin/admin-dashboard/list-service-details";

const index = () => {
  return (
    <>
      <ListServiceDetails />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
