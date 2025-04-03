"use client";
import dynamic from "next/dynamic";
import OrderCompleted from "@/components/shop/order-completed";

const index = () => {
  return (
    <>
      <OrderCompleted />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
