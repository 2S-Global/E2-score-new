"use client";
import dynamic from "next/dynamic";
import ListInstitute from "@/components/admin/admin-dashboard/listinstitutev2";

const index = () => {
  return (
    <>
      <ListInstitute />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
