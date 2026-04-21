import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/InstituteDashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import TopCardBlock2 from "./components/TopCardBlock2";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import PendingApplicants from "./components/PendindingApplicants.jsx"; //need to change
import AcceptedApplicants from "./components/AcceptedApplicants.jsx"; //need to change
import AllApplicants from "./components/AllApplicants.jsx"; //need to change
import RejectedApplicants from "./components/RejectedApplicants.jsx"; //need to change
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardInstituteSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Student Verification!" />
          {/* breadCrumb */}
          <div className="row">
            <div className="col-lg-12">
              {/* Employees Widget */}
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Students</h4>
                </div>

                <div className="widget-content">
                  {/* Tabs */}
                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                        onClick={() => setActiveTab("all")}
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
                        onClick={() => setActiveTab("pending")}
                      >
                        Pending
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "accepted" ? "active" : ""}`}
                        onClick={() => setActiveTab("accepted")}
                      >
                        Accepted
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "rejected" ? "active" : ""}`}
                        onClick={() => setActiveTab("rejected")}
                      >
                        Rejected
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                   {activeTab === "all" && (
                    <>
                      <AllApplicants />
                    </>
                  )}

                  {activeTab === "pending" && (
                    <>
                      <PendingApplicants />
                    </>
                  )}
                  {activeTab === "accepted" && (
                    <>
                      <AcceptedApplicants />
                    </>
                  )}
                   {activeTab === "rejected" && (
                    <>
                      <RejectedApplicants />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End .row profile and notificatins */}
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

export default Index;
