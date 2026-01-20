"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import Image from "next/image";
import JobDescription from "@/components/job-single-pages/shared-components/JobDescription";
import DashboardHeader from "../../../../components/header/DashboardHeader";
const JobSingleDynamicV1 = () => {
  const params = useParams(); // ✅ Don't wrap it with `use()` && get dynamic route params (/job-details/[id])
  const id = params.id;

  const searchParams = useSearchParams(); // get query params (?view=candidate)
  const view = searchParams.get("view"); // e.g., "candidate" or "employer"

  const company = jobs.find((item) => item.id == id) || jobs[0];

  //Get Token
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  // const token = localStorage.getItem("employer_token");
  const token =
    view === "employer"
      ? localStorage.getItem("employer_token")
      : localStorage.getItem("candidate_token");
  if (!token) {
    console.log("No token");
  }

  const [jobPreviewDetails, setJobPreviewDetails] = useState([]);

  //My Custom code
  useEffect(() => {
    const fetchJobPreviewDetails = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${apiurl}/api/jobposting/get_job_preview_details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            jobId: id,
          },
        });

        console.log("Here is my all job listing data which is coming from useEffect !", response.data);

        if (response.data.success && response.status === 200) {
          setJobPreviewDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchJobPreviewDetails();
  }, []);


  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={98}
                      src={
                        jobPreviewDetails?.logoImage ||
                        "/images/resource/no_user.png"
                      }
                      alt="logo"
                    />
                  </span>

                  {jobPreviewDetails?.title && (
                    <h4>{jobPreviewDetails?.title}</h4>
                  )}

                  <ul className="job-info">
                    {/* Industry Type */}
                    {jobPreviewDetails?.industry && (
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        {jobPreviewDetails?.industry || "N/A"}
                      </li>
                    )}
                    {/* Location */}
                    {jobPreviewDetails?.location && (
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {jobPreviewDetails?.location || "N/A"}
                      </li>
                    )}
                    {/* Created Ago */}
                    {jobPreviewDetails?.createdAgo && (
                      <li>
                        <span className="icon flaticon-clock-3"></span>{" "}
                        {jobPreviewDetails?.createdAgo || "N/A"}
                      </li>
                    )}
                    {/* Salary Data */}
                    {jobPreviewDetails?.salary?.structure && (
                      <li>
                        <span className="icon flaticon-money"></span>{" "}
                        {jobPreviewDetails?.salary ? (
                          (() => {
                            const {
                              structure,
                              currency,
                              min,
                              max,
                              amount,
                              rate,
                            } = jobPreviewDetails.salary;

                            switch (structure) {
                              case "range":
                                if (
                                  currency &&
                                  min != null &&
                                  max != null &&
                                  rate
                                ) {
                                  return (
                                    <>
                                      {currency}
                                      {min.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      - {currency}
                                      {max.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      {rate}
                                    </>
                                  );
                                }
                                return <span>Incomplete salary data</span>;

                              case "starting amount":
                                if (currency && amount != null && rate) {
                                  return (
                                    <>
                                      From {currency}
                                      {amount.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      {rate}
                                    </>
                                  );
                                }
                                return <span>Incomplete salary data</span>;

                              case "maximum amount":
                                if (currency && amount != null && rate) {
                                  return (
                                    <>
                                      Up to {currency}
                                      {amount.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      {rate}
                                    </>
                                  );
                                }
                                return <span>Incomplete salary data</span>;

                              case "exact amount":
                                if (currency && amount != null && rate) {
                                  return (
                                    <>
                                      {currency}
                                      {amount.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      {rate}
                                    </>
                                  );
                                }
                                return <span>Incomplete salary data</span>;

                              default:
                                return <span>Salary data not available</span>;
                            }
                          })()
                        ) : (
                          <span>Salary not specified</span>
                        )}
                      </li>
                    )}
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  {/* <ul className="job-other-info">
                    {company?.jobType?.map((val, i) => (
                      <li key={i} className={`${val.styleClass}`}>
                        {val.type}
                      </li>
                    ))}
                  </ul> */}

                  <ul className="job-other-info">
                    {Array.isArray(jobPreviewDetails?.jobType) &&
                      jobPreviewDetails.jobType.map((type, index) => (
                        <li key={index} className="time">
                          {type}
                        </li>
                      ))}
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                {/* This Part should uncomment for only candidate ----------Start */}

                {view === "candidate" && (
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Job
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                )}

                {/* This Part should uncomment for only candidate ----------end */}

                {/* End apply for job btn */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <ApplyJobModalContent />
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div
                className="content-column col-lg-8 col-md-12 col-sm-12"
                style={{ listStyleType: "unset" }}
              >
                {/* <JobDetailsDescriptions /> */}
                {jobPreviewDetails?.jobDescription && (
                  <JobDescription
                    description={jobPreviewDetails?.jobDescription}
                  />
                )}
                {/* End jobdetails content */}

                {/*
                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                */}

                {/* <!-- Other Options --> */}

                {/*
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  <RelatedJobs />
                </div>
                */}

                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    {/* <!-- Job Overview --> */}
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView overview={jobPreviewDetails} />
                    {/* if you want to add map then uncomment this . but dont uncommint in dev mode without map reconfiguration */}
                    {/* <!-- Map Widget --> */}
                    {/* <h4 className="widget-title mt-5">Job Location</h4>
                    <div className="widget-content">
                      <div className="map-outer">
                        <div style={{ height: "300px", width: "100%" }}>
                          <MapJobFinder />
                        </div>
                      </div>
                    </div> */}
                    {/* <!--  Map Widget --> */}

                    <h4 className="widget-title mt-2">Job Skills</h4>
                    <div className="widget-content">
                      <JobSkills />
                    </div>
                    {/* <!-- Job Skills --> */}
                  </div>
                  {/* End .sidebar-widget */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <Image
                            width={54}
                            height={53}
                            src={
                              jobPreviewDetails?.logoImage ||
                              "/images/resource/no_user.png"
                            }
                            alt="resource"
                          />
                        </div>
                        <h5 className="company-name">
                          {jobPreviewDetails?.companyName || "Not specified"}
                        </h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <CompnayInfo />

                      {jobPreviewDetails?.companyWebsite && (
                        <div className="btn-box">
                          <a
                            href={
                              jobPreviewDetails.companyWebsite.startsWith(
                                "http",
                              )
                                ? jobPreviewDetails.companyWebsite
                                : `https://${jobPreviewDetails.companyWebsite}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-btn btn-style-three"
                          >
                            Visit Official Website
                          </a>
                        </div>
                      )}
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});
