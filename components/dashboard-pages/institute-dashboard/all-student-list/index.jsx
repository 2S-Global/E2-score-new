import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";
import BreadCrumb from "../../BreadCrumb";

import CopyrightFooter from "../../CopyrightFooter";

import Companytable from "./components/table";
const Index = () => {
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
          <BreadCrumb title="All Students !" />
          {/* breadCrumb */}
          <div className="row">
            <div className="col-lg-12">
              {/* Employees Widget */}
              <div className="applicants-widget ls-widget">
                {/* <div className="widget-title"></div> */}

                <div className="widget-content">
                  <Companytable />
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
