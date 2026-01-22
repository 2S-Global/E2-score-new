"use client";
import Link from "next/link";
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobListingsTable from "./components/JobListingsTable";
import MenuToggler from "../../MenuToggler";

const index = () => {
  
  return (
    <div className="page-wrapper dashboard" style={{ marginLeft: 0, paddingLeft: 0 }}>
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      {/* <DashboardEmployerSidebar /> */}
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        {/* <div className="dashboard-outer"> */}
        <div className="no-sidebar-dashboard" style={{padding: "30px"}}>
          <BreadCrumb title="Shortlisted Candidates" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/employers-dashboard/manage-jobs"
              className="btn btn-outline-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                borderColor: "#dee2e6",
                color: "#6c757d",
                transition: "all 0.2s ease",
                textDecoration: "none",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#1967d2";
                e.target.style.color = "#1967d2";
                e.target.style.backgroundColor = "#e8f0fe";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#dee2e6";
                e.target.style.color = "#6c757d";
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <i className="la la-arrow-left" style={{ fontSize: "16px" }}></i>
              Back
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <JobListingsTable />
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
