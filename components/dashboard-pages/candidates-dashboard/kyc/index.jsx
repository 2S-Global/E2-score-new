import React, { useState } from "react";
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";

import KycBoxdemo from "../my-profile/components/KycBox";
import PaymentDetails from "./components/paynowtable";
import KycBox from "./components/Kycbox";
import AadharOtp from "./components/aadharotp";

const KycPage = () => {
  const [activeTab, setActiveTab] = useState("kyc");
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
          <BreadCrumb title="KYC!" />
          {/* breadCrumb */}

          <MenuToggler />

          {/* Tab buttons */}
          <div className="mb-3">
            <button
              className={`btn ${activeTab === "adhar" ? "btn-primary" : "btn-outline-primary"} me-2`}
              onClick={() => setActiveTab("adhar")}
            >
              Aadhaar Card
            </button>
            <button
              className={`btn ${activeTab === "kyc" ? "btn-primary" : "btn-outline-primary"} me-2`}
              onClick={() => setActiveTab("kyc")}
            >
              Other Documents
            </button>

            <button
              className={`btn ${activeTab === "cart" ? "btn-primary" : "btn-outline-primary"} me-2`}
              onClick={() => setActiveTab("cart")}
            >
              Cart
            </button>
          </div>
          {/* Tab content */}
          <div className="row">
            <div className="col-lg-12">
              {activeTab === "kyc" && <KycBox />}
              {activeTab === "adhar" && <AadharOtp />}
              {activeTab === "cart" && <PaymentDetails />}
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

export default KycPage;
