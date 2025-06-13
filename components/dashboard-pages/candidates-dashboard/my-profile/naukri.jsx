import React from "react";
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";

/* component added */
import ResumeBox from "./components/resumebox";
import ResumeHeadlineSection from "./components/ResumeHeadlineSection";
import Keyskillsection from "./components/KeyskillSection";
import Employsection from "./components/Employmentsection";
import Academysection from "./components/academicsection";
import ItkeySection from "./components/Itskillsection";
import ProjectSection from "./components/projectSection";
import ProfilesumerySection from "./components/profilesummary";
import AcomSection from "./components/accomsection2";
import AcomSectiondemo from "./components/accomsection";
import Carrersection from "./components/carrersection";
import PersonalSection from "./components/Personal_details";

import HeadSection from "./components/HeadSection";
import QuickActionSidebar from "./components/quickaction";
const index = () => {
  return (
    <div
      className="page-wrapper dashboard container"
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}
      <div className="row">
        {/*   <DashboardCandidatesSidebar /> */}
        <div className="col-lg-3 col-md-3">
          <QuickActionSidebar />
        </div>

        {/* <!-- End Candidates Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard col-lg-9 col-md-9">
          <div className="dashboard-outer">
            <BreadCrumb title="My Profile!" />
            {/* breadCrumb */}

            {/*      <MenuToggler /> */}
            {/* Collapsible sidebar button */}

            <div className="row">
              {/* Quick action section */}

              <div className="col-lg-12 col-md-12">
                <div id="head-section">
                  <HeadSection />
                </div>
                <div id="resume-headline">
                  <ResumeHeadlineSection />
                </div>
                <div id="profile-summary">
                  <ProfilesumerySection />
                </div>
                <div id="key-skill">
                  <Keyskillsection />
                </div>
                <div id="personal">
                  <PersonalSection />
                </div>
                <div id="academy">
                  <Academysection />
                </div>
                <div id="acom">
                  <AcomSection />
                </div>
                <div id="acom-demo">
                  <AcomSectiondemo />
                </div>
                <div id="career">
                  <Carrersection />
                </div>
                <div id="employment">
                  <Employsection />
                </div>
                <div id="it-key">
                  <ItkeySection />
                </div>
                <div id="projects">
                  <ProjectSection />
                </div>
                <div id="resume-box" className="ls-widget">
                  <div className="tabs-box">
                    <ResumeBox />
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}
      </div>
      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
