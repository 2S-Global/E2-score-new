"use client";
import MobileMenu from "../../../header/InstituteMobileMenu";
import DashboardHeader from "../../../header/InstituteDashboardHeader";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";

import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import Form from "./components/Form";
import { useState } from "react";
const Index = () => {
  return (
    <>
      <div className="page-wrapper dashboard ">
        <span className="header-span"></span>
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardInstituteSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
             <MenuToggler />
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <div className="applicants-widget ls-widget">
                  <div
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Import New Student</h4>
                     <a
                href="/institute-student-import.csv"
                download
                className="btn btn-sm btn-outline-primary"
              >
                Download Template Csv
              </a>
                  </div>
                 
                  <div className="widget-content">
                        <Form/>
                  </div>
                 
                  
                </div>
              </div>
            </div>
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </>
  );
};

export default Index;