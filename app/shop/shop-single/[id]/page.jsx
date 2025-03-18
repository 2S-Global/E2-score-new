"use client";
import ShopDetails from "@/components/shop/shop-single/ShopDetails";
import dynamic from "next/dynamic";



const ShopSingleDyanmic = ({ params }) => {
  return (
    <>
      <ShopDetails id={params.id} />
    </>
  );
};

export default dynamic(() => Promise.resolve(ShopSingleDyanmic), {
  ssr: false,
});
