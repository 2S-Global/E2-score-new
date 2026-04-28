import MobileMenu from "../../../header/InstituteMobileMenu";
import DashboardHeader from "../../../header/InstituteDashboardHeader";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";
import CopyrightFooter from "../../CopyrightFooter";
import Table from "./components/table";
import AddFormModal from "./components/modals/AddFormModal";
import { useState } from "react";
import MenuToggler from "../../MenuToggler";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const openModalAdd = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalAdd = () => {
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

        <DashboardInstituteSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <MenuToggler />
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
                    <h4>Company List</h4>

                    <div style={{ display: "flex", gap: "15px" }}>
                      <span
                        onClick={openModalAdd}
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Company
                      </span>
                    </div>
                  </div>
                  <Table setRefresh={setRefresh} refresh={refresh} />
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
        <AddFormModal
          show={isModalOpen}
          onClose={closeModalAdd}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
   
    </>
  );
};

export default Index;
