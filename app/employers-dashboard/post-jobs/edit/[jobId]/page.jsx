"use client";
import dynamic from "next/dynamic";
import React, { use } from "react";
import PostBoxForm from "@/components/dashboard-pages/employers-dashboard/post-jobs/components/PostBoxForm";
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

const index = ({ params }) => {
    const { jobId } = use(params);
    return (
        <>
            {/* <PostBoxForm jobId={params.jobId} />  */}
            <PostJob jobId={jobId} />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });