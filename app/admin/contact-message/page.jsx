"use client";
import dynamic from "next/dynamic";
import ContactMessage from "@/components/admin/admin-dashboard/contactMessage";

const index = () => {
  return (
    <>
      <ContactMessage />
    </>
  );
};
export default dynamic(() => Promise.resolve(index), { ssr: false });
