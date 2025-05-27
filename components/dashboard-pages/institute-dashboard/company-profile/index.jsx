"use client";

import { useState } from "react";
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
//
import ContactInfoBox from "./components/ContactInfoBox";

import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

/* component */
import AccountBox from "./components/account";
import KycBox from "./components/KycBox";
import BranchBox from "./components/brance";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Default active tab

  const companyDetails = {
    kycStatus: "Pending",
    name: "XYZ Technologies Pvt. Ltd.",
    addressLabel: "Primary Address",
    address: "1234 MG Road, Gurgaon, Haryana - 122002, India",
    country: "India",
    state: "Haryana",
    city: "Gurgaon",
    pincode: "122002",
    gstin: "29ABCDE1234F1Z5",
  };

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* Header Span for height */}

      <LoginPopup />
      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      {/* Dashboard Section */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Company Profile!" />
          <MenuToggler />

          {/* Tabs Navigation */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                background: activeTab === "profile" ? "#007bff" : "#eee",
                color: activeTab === "profile" ? "white" : "black",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </button>
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                background: activeTab === "account" ? "#007bff" : "#eee",
                color: activeTab === "account" ? "white" : "black",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("account")}
            >
              Account Details
            </button>
            {/* KYC BOX */}
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                background: activeTab === "kyc" ? "#007bff" : "#eee",
                color: activeTab === "kyc" ? "white" : "black",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("kyc")}
            >
              KYC
            </button>
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                background: activeTab === "social" ? "#007bff" : "#eee",
                color: activeTab === "social" ? "white" : "black",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("social")}
            >
              Social Network
            </button>

            <button
              style={{
                padding: "10px 15px",
                border: "none",
                background: activeTab === "brance" ? "#007bff" : "#eee",
                color: activeTab === "brance" ? "white" : "black",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("brance")}
            >
              Branch
            </button>

            {/*      <button
                            style={{
                                padding: "10px 15px",
                                border: "none",
                                background: activeTab === "contact" ? "#007bff" : "#eee",
                                color: activeTab === "contact" ? "white" : "black",
                                cursor: "pointer",
                                transition: "0.3s",
                                fontWeight: "bold",
                            }}
                            onClick={() => setActiveTab("contact")}
                        >
                            Contact Information
                        </button> */}
          </div>

          {/* Tab Content */}
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  {activeTab === "profile" && (
                    <div>
                      <div className="widget-title">
                        <h4>Company Profile</h4>
                      </div>
                      <MyProfile />
                    </div>
                  )}

                  {activeTab === "kyc" && (
                    <div>
                      <div className="widget-title">
                        <h4>KYC</h4>
                      </div>
                      <div className="widget-content">
                        <KycBox companyDetails={companyDetails} />
                      </div>
                    </div>
                  )}

                  {activeTab === "social" && (
                    <div>
                      <div className="widget-title">
                        <h4>Social Network</h4>
                      </div>
                      <div className="widget-content">
                        <SocialNetworkBox />
                      </div>
                    </div>
                  )}

                  {activeTab === "account" && (
                    <div>
                      <div className="widget-title">
                        <h4>Account Details</h4>
                      </div>
                      <div className="widget-content">
                        <AccountBox />
                      </div>
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <div>
                      <div className="widget-title">
                        <h4>Contact Information</h4>
                      </div>
                      <div className="widget-content">
                        <ContactInfoBox />
                      </div>
                    </div>
                  )}

                  {activeTab === "brance" && (
                    <div>
                      <BranchBox />
                    </div>
                  )}
                </div>
              </div>
              {/* End ls-widget */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* End Dashboard Section */}

      <CopyrightFooter />
    </div>
    // End page-wrapper
  );
};

export default CompanyProfile;
