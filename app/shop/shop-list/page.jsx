"use client";
import dynamic from "next/dynamic";
import ShopList from "@/components/shop/shop-list";

const index = () => {
  return (
    <>
      <ShopList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
