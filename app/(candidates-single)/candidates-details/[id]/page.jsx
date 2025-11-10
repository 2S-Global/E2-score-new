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
import Underdev from "@/components/common/underdev";
///additional imports
import KYCBlock from "@/components/candidates-single-pages/new-components/kycblock";
import Personalblock from "@/components/candidates-single-pages/new-components/personalblock";
import Workprofileblock from "@/components/candidates-single-pages/new-components/workprofileblock";
import ReseachBlock from "@/components/candidates-single-pages/new-components/researchblock";
import PresentationBlock from "@/components/candidates-single-pages/new-components/presentationblock";
import PatentBlock from "@/components/candidates-single-pages/new-components/pretentblock";
import CertificationBlock from "@/components/candidates-single-pages/new-components/Certificationblock";
import Careerblock from "@/components/candidates-single-pages/new-components/carrerblock";
import Projectblock from "@/components/candidates-single-pages/new-components/projectblock";

const CandidateSingleDynamicV2 = () => {
  // const params = useParams();
  const { id } = useParams();
  const candidate = candidates.find((item) => item.id == id) || candidates[0];

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [Realcandidate, setRealCandidate] = useState({});

  const [underdev, setUnderdev] = useState(false);
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

  const [bookmarked, setBookmarked] = useState(false);
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token") ||
        localStorage.getItem("Institute_token") ||
        localStorage.getItem("Super_token") ||
        localStorage.getItem("candidate_token")
      : null;
  const toggleBookmark = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/candidatebookmark/add_candidate_bookmark`,
        {
          bookmark: !bookmarked,
          _id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setBookmarked(response.data.data.isArchived);
        console.log(
          "Bookmark status updated successfully:",
          response.data.data.isArchived
        );
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchbookmarkStatus();
    }
  }, [token]);

  const fetchbookmarkStatus = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/candidatebookmark/get_candidate_bookmark?_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setBookmarked(response.data.data.isBookmarked);
        console.log(
          "Fetched bookmark status successfully:",
          response.data.data.isBookmarked
        );
      }
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
    }
  };
  if (underdev) {
    return (
      <>
        <span className="header-span"></span>
        <LoginPopup />
        {/* End Login Popup Modal */}
        <DefaulHeader />
        {/* End Main Header */}
        <MobileMenu />
        {/* End MobileMenu */}
        <Underdev />
        <FooterDefault footerStyle="alternate5" />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <span className="header-span"></span>
        <LoginPopup />
        {/* End Login Popup Modal */}
        <DefaulHeader />
        {/* End Main Header */}
        <MobileMenu />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <CustomizedProgressBars />
        </div>
        <FooterDefault footerStyle="alternate5" />
      </>
    );
  }

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

                        <li>
                          <span className="icon flaticon-email"></span>
                          {Realcandidate?.userInformation?.email || ""}
                        </li>

                        <li>
                          <span className="icon flaticon-phone-call"></span>
                          {Realcandidate?.userInformation?.phoneNumber || ""}
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
                {/* kyc information */}
                <KYCBlock kycdata={Realcandidate?.kycResult || {}} />

                <div className="job-detail">
                  <p className="resume-headline fw-500 ">
                    <strong>
                      {Realcandidate?.userInformation?.resumeHeadline || ""}
                    </strong>
                  </p>
                  <p>{Realcandidate?.userInformation?.profileSummary || ""}</p>

                  <Personalblock
                    dataog={Realcandidate.candidatePersonalDetails || {}}
                  />

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
                              <span
                                className="year"
                                style={{
                                  minWidth: "120px",
                                  textAlign: "center",
                                }}
                              >
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

                  <Workprofileblock data={Realcandidate.workSamples} />
                  <ReseachBlock data={Realcandidate.researchPublications} />
                  <PresentationBlock data={Realcandidate.userPresentations} />
                  <PatentBlock data={Realcandidate.userPatents} />
                  <CertificationBlock data={Realcandidate.userCertifications} />
                  <Careerblock data={Realcandidate.candidateCareerProfile} />

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

                  <Projectblock data={Realcandidate.candidateProjects} />

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
                        className="theme-btn btn-style-one me-2"
                        href={Realcandidate?.sidebarDetails?.resumeUrl || "#"}
                        download // 👈 This triggers a download instead of opening
                        target="_blank"
                      >
                        Download Resume
                      </a>
                    )}

                    {/* <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button> */}

                    {token && (
                      <button
                        type="button"
                        onClick={toggleBookmark}
                        aria-label="Toggle bookmark"
                        style={{
                          display: "flex",
                          height: "50px",
                          width: "50px",
                          lineHeight: "50px",
                          textAlign: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          cursor: "pointer",
                          color: bookmarked ? "#fff" : "var(--primary-color)",
                          borderRadius: "7px",
                          background: bookmarked
                            ? "var(--primary-color)"
                            : "rgba(25, 103, 210, 0.07)",
                          transition: "all 300ms ease",
                          /*  marginLeft: "20px", */
                          flex: "0 0 50px",
                          border: "none",
                        }}
                      >
                        <i
                          className={`${bookmarked ? "fa-solid" : "fa-regular"} flaticon-bookmark`}
                          style={{
                            lineHeight: "50px",
                          }}
                        ></i>
                      </button>
                    )}
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
                              if (currency && !salary) return "Not Disclosed";
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
                              if (currency && !salary) return "Not Disclosed";
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
                          <i className="icon icon-user-2"></i>
                          <h5>Fathername:</h5>
                          <span>
                            {Realcandidate?.userInformation?.fatherName ||
                              "N/A"}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-location"></i>
                          <h5>Home Town:</h5>
                          <span>
                            {Realcandidate?.userInformation?.hometown || "N/A"}
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
                  {Realcandidate?.itSkillNames?.length > 0 && (
                    <div className="sidebar-widget">
                      <h4 className="widget-title">IT Skills</h4>
                      <div className="widget-content">
                        <ul className="job-skills">
                          <JobSkills
                            skills={Realcandidate?.itSkillNames || []}
                          />
                        </ul>
                      </div>
                    </div>
                  )}
                  {Realcandidate?.nonItSkillNames?.length > 0 && (
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
                  )}
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
