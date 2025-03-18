"use client";
import dynamic from "next/dynamic";
import Cart from "@/components/shop/cart";



const index = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
