"use client";
import dynamic from "next/dynamic";
import Clients from "@/components/admin/admin-dashboard/clients";

const index = () => {
  return (
    <>
      <Clients />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
