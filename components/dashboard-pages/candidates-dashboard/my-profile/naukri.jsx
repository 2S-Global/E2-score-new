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
import AcomSection from "./components/accomsection";
import Carrersection from "./components/carrersection";
import PersonalSection from "./components/Personal_details";

import HeadSection from "./components/HeadSection";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* score Section */}
              {/*  <ScoreSection/> */}

              {/* Profile Section */}
              <HeadSection />

              {/* E2 score section */}
              {/* <EscoreSection/>
               */}

              {/* Resume Headline Section */}
              <ResumeHeadlineSection />
              {/* Keyskill Section */}
              <Keyskillsection />
              {/* Employment Section */}
              <Employsection />
              {/* Academy Section  */}
              <Academysection />
              {/* IT Key Section */}
              <ItkeySection />
              {/* project  */}
              <ProjectSection />
              {/* profile summery profilesumerySection */}
              <ProfilesumerySection />
              {/* Acom Section */}
              <AcomSection />
              {/* carrer section  */}
              <Carrersection />
              {/* Personal details */}
              <PersonalSection />
              {/* Resume */}
              <div className="ls-widget">
                <div className="tabs-box">
                  {/* Resume  */}
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

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
