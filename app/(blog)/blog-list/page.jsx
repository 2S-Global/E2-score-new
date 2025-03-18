"use client";
import dynamic from "next/dynamic";

import BlogList from "@/components/blog-meu-pages/blog-list-v1";

const index = () => {
  return (
    <>
      <BlogList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
