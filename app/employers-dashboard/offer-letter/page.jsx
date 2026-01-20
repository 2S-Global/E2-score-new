"use client";
import dynamic from "next/dynamic";
import OfferLetter from "@/components/dashboard-pages/employers-dashboard/offer-letter";

const index = () => {
  return (
    <>
      <OfferLetter />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
