"use client";
import dynamic from "next/dynamic";
import Checkout from "@/components/shop/checkout";

const index = () => {
  return (
    <>
      <Checkout />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
