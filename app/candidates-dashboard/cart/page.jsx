"use client";
import dynamic from "next/dynamic";
import KycPage from "@/components/dashboard-pages/candidates-dashboard/cart";

const index = () => {
  return (
    <>
      <KycPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
