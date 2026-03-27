"use client";
import dynamic from "next/dynamic";

import Aboutpage from "@/components/admin/admin-dashboard/aboutpage";

const index = () => {
  return (
    <>
      <Aboutpage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
