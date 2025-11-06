"use client";
import dynamic from "next/dynamic";
import candidates from "@/data/candidates";
import candidateResume from "@/data/candidateResume";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import Image from "next/image";
import { use } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import { useEffect, useState } from "react";
import CustomizedProgressBars from "@/components/common/loader";
import { it } from "@faker-js/faker";

const CandidateSingleDynamicV2 = () => {
  const params = useParams();
  const id = params?.id;
  const candidate = candidates.find((item) => item.id == id) || candidates[0];

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [Realcandidate, setRealCandidate] = useState({});
  useEffect(() => {
    fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/candidate/candidateDetails/get_candidate_details?candidateId=${id}`
      );
      if (response.data.success) {
        setRealCandidate(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  if (loading) {
    return <CustomizedProgressBars />;
  }

  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  ];

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="candidate-block-five">
                  <div className="inner-box">
                    <div className="content">
                      {/*  <figure className="image">
                        <img
                          width={100}
                          height={100}
                          src={
                            Realcandidate?.userInformation?.profilePicture ||
                            "/images/resource/no_user.png"
                          }
                          alt="avatar"
                        />
                      </figure> */}
                      <figure className="image  mx-auto">
                        <img
                          className="w-100 h-100"
                          src={
                            Realcandidate?.userInformation?.profilePicture ||
                            "/images/resource/no_user.png"
                          }
                          alt="avatar"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                      <h4 className="name">
                        {Realcandidate?.userInformation?.fullName || ""}
                      </h4>

                      <ul className="candidate-info">
                        <li className="designation">
                          {Realcandidate?.userInformation?.currentJobTitle ||
                            ""}
                        </li>
                        {Realcandidate?.userInformation?.currentLocation && (
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {Realcandidate?.userInformation?.currentLocation ||
                              ""}
                          </li>
                        )}
                        <li>
                          <span className="icon flaticon-clock"></span>Member
                          Since,{" "}
                          {new Date(
                            Realcandidate?.userInformation?.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }) || ""}
                        </li>
                      </ul>

                      <ul className="post-tags">
                        {Realcandidate?.userInformation?.skills?.map(
                          (val, i) => (
                            <li key={i} className="m-1">
                              {val?.trim().charAt(0).toUpperCase() +
                                val?.trim().slice(1)}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  <!-- Candidate block Five --> */}

                <div className="job-detail">
                  <p className="resume-headline fw-500">
                    <strong>
                      {Realcandidate?.userInformation?.resumeHeadline || ""}
                    </strong>
                  </p>
                  <p>{Realcandidate?.userInformation?.profileSummary || ""}</p>

                  {/*   <div className="video-outer">
                    <h4>Candidates About</h4>
                    <AboutVideo />
                  </div> */}
                  {/* <!-- About Video Box --> */}

                  {/* <!-- Candidate Resume Start --> */}

                  {/* Education */}
                  <div className={`resume-outer theme-red`}>
                    <div className="upper-title">
                      <h4>Education</h4>
                    </div>

                    {/* <!-- Start Resume BLock --> */}
                    {Realcandidate?.education?.map((item) => (
                      <div className="resume-block" key={item._id}>
                        <div className="inner">
                          <span className="name">{/* item.meta ||  */ ""}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{item.courseName || item.levelName || ""}</h3>
                              <span>
                                {item.instituteName || item.board || ""}
                              </span>
                            </div>
                            <div className="edit-box">
                              <span className="year">
                                {item.from || item.to
                                  ? `${item.from || ""} - ${item.to || "Present"}`
                                  : item.year_of_passing}
                              </span>
                            </div>
                          </div>
                          {/*    <div className="text">{item.text}</div> */}
                        </div>
                      </div>
                    ))}

                    {/* <!-- End Resume BLock --> */}
                  </div>

                  {/* Work & Experience */}
                  <div className={`resume-outer theme-blue`}>
                    <div className="upper-title">
                      <h4>Work & Experience</h4>
                    </div>
                    {Realcandidate?.employment?.map((item) => (
                      <div className="resume-block" key={item._id}>
                        <div className="inner">
                          <span className="name">{/* item.meta ||  */ ""}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{item.jobTitle || ""}</h3>
                              <span>{item.companyName || ""}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">
                                {item.duration || ""}
                              </span>
                            </div>
                          </div>
                          <div
                            className="text"
                            dangerouslySetInnerHTML={{
                              __html: item.jobDescription || "",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <!-- Candidate Resume End --> */}

                  {/*  <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div> */}
                  {/* <!-- Portfolio --> */}
                </div>
                {/* End job-details */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    {Realcandidate?.sidebarDetails?.resumeUrl && (
                      <a
                        className="theme-btn btn-style-one"
                        href={Realcandidate?.sidebarDetails?.resumeUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download Resume
                      </a>
                    )}

                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>

                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>
                            {(() => {
                              const exp =
                                Realcandidate?.sidebarDetails?.totalExperience;
                              const year = exp?.year;
                              const month = exp?.month;

                              if (!year && !month)
                                return "No experience mentioned";
                              if (year && !month)
                                return `${year} Year${year > 1 ? "s" : ""}`;
                              if (!year && month)
                                return `${month} Month${month > 1 ? "s" : ""}`;
                              return `${year} Year${year > 1 ? "s" : ""} and ${month} Month${month > 1 ? "s" : ""}`;
                            })()}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{Realcandidate?.sidebarDetails?.age}</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>
                            {(() => {
                              const salaryInfo =
                                Realcandidate?.sidebarDetails?.currentSalary;
                              const currency = salaryInfo?.currency;
                              const salary = salaryInfo?.salary;

                              if (!currency && !salary) return "Not Disclosed";
                              if (currency && !salary) return currency;
                              if (!currency && salary) return salary;
                              return `${currency} ${salary}`;
                            })()}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>
                            {" "}
                            {(() => {
                              const salaryInfo =
                                Realcandidate?.sidebarDetails?.expectedSalary;
                              const currency = salaryInfo?.currency;
                              const salary = salaryInfo?.salary;

                              if (!currency && !salary) return "Not Disclosed";
                              if (currency && !salary) return currency;
                              if (!currency && salary) return salary;
                              return `${currency} ${salary}`;
                            })()}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>
                            {Realcandidate?.sidebarDetails?.genderName}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>
                            {Realcandidate?.sidebarDetails?.languages?.map(
                              (item, i) => (
                                <span key={i}>
                                  {item}
                                  {i !==
                                  Realcandidate?.sidebarDetails?.languages
                                    .length -
                                    1
                                    ? ", "
                                    : ""}
                                </span>
                              )
                            )}
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>
                            {Realcandidate?.sidebarDetails?.highestEducation}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  {Realcandidate?.onlineProfiles?.length > 0 && (
                    <div className="sidebar-widget social-media-widget">
                      <h4 className="widget-title">Online Profile</h4>
                      <div className="widget-content">
                        <div className="social-links">
                          <div className="social-links">
                            {Realcandidate?.onlineProfiles?.map((item) => (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={item._id}
                              >
                                <i className={`fab ${item.icon}`}></i>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">IT Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills skills={Realcandidate?.itSkillNames || []} />
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Other Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills
                          skills={Realcandidate?.nonItSkillNames || []}
                        />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                  {/* End .sidebar-widget contact-widget */}
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

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV2), {
  ssr: false,
});
