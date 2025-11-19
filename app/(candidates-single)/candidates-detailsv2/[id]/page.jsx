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

//new original
import Candidatedetails from "@/components/candidates-single-pages/detailspagev2";

const CandidateSingleDynamicV2 = () => {
  // const params = useParams();
  const { id } = useParams();
  //const candidate = candidates.find((item) => item.id == id) || candidates[0];

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [Realcandidate, setRealCandidate] = useState({});
  const [Realcandidatev2, setRealCandidatev2] = useState({});

  const [underdev, setUnderdev] = useState(false);
  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);

    console.time("loadData");

    try {
      await Promise.all([
        (async () => {
          console.time("fetchCandidate");
          await fetchCandidate();
          console.timeEnd("fetchCandidate");
        })(),

        (async () => {
          console.time("fetchCandidatev2");
          await fetchCandidatev2();
          console.timeEnd("fetchCandidatev2");
        })(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      console.timeEnd("loadData");
      setLoading(false);
    }
  };

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
  const fetchCandidatev2 = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/candidate/candidateDetails/get_candidate_details_v2?candidateId=${id}`
      );
      if (response.data.success) {
        setRealCandidatev2(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
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
    setBookmarkLoading(true);
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
      setBookmarkLoading(false);
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
      <section
        className="candidate-detail-section"
        style={{
          backgroundColor: "#f5f7fc",
        }}
      >
        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/* real UI */}
                <Candidatedetails Newdata={Realcandidatev2 || []} />
              </div>
              {/* End .content-column */}

              <div
                className="sidebar-column col-lg-4 col-md-12 col-sm-12 "
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                <aside className="sidebar">
                  <div className="btn-box mt-2">
                    {Realcandidate?.sidebarDetails?.resumeUrl && (
                      <a
                        className="theme-btn btn-style-one me-2"
                        href={Realcandidate?.sidebarDetails?.resumeUrl || "#"}
                        download // 👈 This triggers a download instead of opening
                        target="_blank"
                      >
                        Download Resume (v2)
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
                        disabled={!token && bookmarkLoading}
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
                        {bookmarkLoading ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          <i
                            className={`${bookmarked ? "fa-solid" : "fa-regular"} flaticon-bookmark`}
                            style={{ lineHeight: "50px" }}
                          ></i>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon fas fa-briefcase text-primary"></i>
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
                          <i className="icon fas fa-user-clock text-warning "></i>
                          <h5>Age:</h5>
                          <span>
                            {Realcandidate?.sidebarDetails?.age ||
                              "Not Disclosed"}
                          </span>
                        </li>

                        <li>
                          <i className="icon fas fa-coins text-success"></i>
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
                          <i className="icon fas fa-hand-holding-usd text-info"></i>
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
                          <i
                            className="icon fas fa-venus-mars text-primary "
                            /*  style={{
                              color: "#3e74d6",
                            }} */
                          ></i>{" "}
                          {/* like this  */}
                          <h5>Gender:</h5>
                          <span>
                            {Realcandidate?.sidebarDetails?.genderName ||
                              "Not Disclosed"}
                          </span>
                        </li>
                        <li>
                          <i className="icon fas fa-male text-info"></i>
                          <h5>Father's Name:</h5>
                          <span
                            className="truncate-text"
                            title={Realcandidate?.userInformation?.fatherName}
                          >
                            {Realcandidate?.userInformation?.fatherName ||
                              "Not Disclosed"}
                          </span>
                        </li>

                        <li>
                          <i className="icon fas fa-female text-info"></i>
                          <h5>Mother's Name:</h5>
                          <span
                            className="truncate-text"
                            title={Realcandidate?.userInformation?.motherName}
                          >
                            {Realcandidate?.userInformation?.motherName ||
                              "Not Disclosed"}
                          </span>
                        </li>
                        {/* partner name */}
                        <li>
                          <i className="icon fas fa-heart text-danger"></i>
                          <h5>Partner's Name:</h5>
                          <span
                            className="truncate-text"
                            title={
                              Realcandidate?.candidatePersonalDetails
                                ?.partner_name
                            }
                          >
                            {Realcandidate?.candidatePersonalDetails
                              ?.partner_name || "Not Disclosed"}
                          </span>
                        </li>

                        <li>
                          <i className="icon fas fa-map-marker-alt text-secondary"></i>
                          <h5>Home Town:</h5>
                          <span
                            className="truncate-text"
                            title={Realcandidate?.userInformation?.hometown}
                          >
                            {Realcandidate?.userInformation?.hometown ||
                              "Not Disclosed"}
                          </span>
                        </li>

                        <li>
                          <i className="icon fas fa-language text-primary"></i>
                          <h5>Language:</h5>
                          <span
                            className="truncate-text"
                            title={Realcandidate?.sidebarDetails?.languages}
                          >
                            {Array.isArray(
                              Realcandidate?.sidebarDetails?.languages
                            ) &&
                            Realcandidate.sidebarDetails.languages.length >
                              0 ? (
                              Realcandidate.sidebarDetails.languages.map(
                                (item, i) => (
                                  <span key={i}>
                                    {item}
                                    {i !==
                                    Realcandidate.sidebarDetails.languages
                                      .length -
                                      1
                                      ? ", "
                                      : ""}
                                  </span>
                                )
                              )
                            ) : (
                              <span>Not Disclosed</span>
                            )}
                          </span>
                        </li>

                        <li>
                          <i className="icon fas fa-graduation-cap text-success"></i>
                          <h5>Education Level:</h5>
                          <span
                            className="truncate-text"
                            title={
                              Realcandidate?.sidebarDetails?.highestEducation
                            }
                          >
                            {Realcandidate?.sidebarDetails?.highestEducation ||
                              "Not Disclosed"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}
                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Online Profile</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        {Array.isArray(Realcandidate?.onlineProfiles) &&
                        Realcandidate.onlineProfiles.length > 0 ? (
                          Realcandidate.onlineProfiles.map((item) => (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={item._id}
                              style={{ marginRight: "4px" }}
                            >
                              <i className={`fab ${item.icon}`}></i>
                            </a>
                          ))
                        ) : (
                          <span>No Online Profile given</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* End .sidebar-widget social-media-widget */}
                  {Array.isArray(Realcandidate?.itSkillNames) &&
                    Realcandidate.itSkillNames.length > 0 && (
                      <div className="sidebar-widget">
                        <h4 className="widget-title">IT Skills</h4>
                        <div className="widget-content">
                          <ul className="job-skills">
                            <JobSkills skills={Realcandidate.itSkillNames} />
                          </ul>
                        </div>
                      </div>
                    )}

                  {Array.isArray(Realcandidate?.nonItSkillNames) &&
                    Realcandidate.nonItSkillNames.length > 0 && (
                      <div className="sidebar-widget">
                        <h4 className="widget-title">Other Skills</h4>
                        <div className="widget-content">
                          <ul className="job-skills">
                            <JobSkills skills={Realcandidate.nonItSkillNames} />
                          </ul>
                        </div>
                      </div>
                    )}

                  {/* Fallback if no skills are given */}
                  {(!Array.isArray(Realcandidate?.itSkillNames) ||
                    Realcandidate.itSkillNames.length === 0) &&
                    (!Array.isArray(Realcandidate?.nonItSkillNames) ||
                      Realcandidate.nonItSkillNames.length === 0) && (
                      <div className="sidebar-widget">
                        <h4 className="widget-title">Skills</h4>
                        <div className="widget-content">
                          <p>No skills provided</p>
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
