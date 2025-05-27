"use client";
import dynamic from "next/dynamic";
import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

const index = () => {
  return (
    <>
      <Messages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
