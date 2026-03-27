import MobileMenu from "../../../header/AdminMobileMenu";
import DashboardHeader from "../../../header/DashboardAdminheader";
import DashboardEmployerSidebar from "../../../header/DashboardAdminsidebar";
import CopyrightFooter from "../../CopyrightFooter";
import Testimonialtable from "./components/table";
import TestimonialformModal from "./components/modals/formmodal";
import { useState } from "react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [refresh, setRefresh] = useState(false);
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };



  return (
    <>
      <div className="page-wrapper dashboard ">
        <span className="header-span"></span>
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardEmployerSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12">
                <div className="applicants-widget ls-widget">
                  <div
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Testimonial List</h4>

                    <div style={{ display: "flex", gap: "15px" }}>
                      <span
                        onClick={openModalRH}
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Testimonial
                      </span>
                    </div>
                  </div>
                  <Testimonialtable setRefresh={setRefresh} refresh={refresh} />
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
      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <TestimonialformModal
          show={isModalOpen}
          onClose={closeModalRH}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}

     
    </>
  );
};

export default Index;
